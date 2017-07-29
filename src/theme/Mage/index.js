import React from 'react';
import {HashRouter, Route, Link} from 'react-keeper';
import mD from 'markdown-it';
import mk from 'markdown-it-mathjax';
const md = mD();
md.use(mk());

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      date: '',
      content: ''
    };
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  async componentWillReceiveProps(props) {
    const raw = await fetch(props.src);
    const text = await raw.text();
    await this.setStateAsync({
      name: props.name,
      content: md.render(text),
      date: props.date
    });
  }

  async componentDidMount() {
    await this.componentWillReceiveProps(this.props);
  }

  componentDidUpdate() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  }
  render() {
    if(this.state.name !== '') {
      return (
        <div id="outter">
          <header>
            <div id="title">
              <h1><Link to="/">{this.props.title}</Link></h1>
            </div>
            <div id="postTitle">
              <h1>{this.state.name}</h1>
            </div>
            <div id="postMeta">
              {this.state.date.getFullYear()}年{this.state.date.getMonth() + 1}月{this.state.date.getDate()}日
            </div>
          </header>
          <div id="post" dangerouslySetInnerHTML={{__html: this.state.content || '加载中'}}>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          加载中
          <div id="post"></div>
        </div>
      );
    }
  }
}
class Home extends React.Component {
  render() {
    const posts = [];
    for(let i = 0;i < this.props.posts.length;i++) {
      const post = this.props.posts[i];
      posts.push(
        <li>
          <Link to={`/post/${post.id}`} key={post.name}>
            <span id="postName">{post.name}</span>
          </Link>
        </li>
      );
    }
    return (
      <div id="content">
        <header>
          <div id="title">
            <h1><Link to="/">{this.props.title}</Link></h1>
          </div>
          <hr/>
          <div id="description">
            <p dangerouslySetInnerHTML={{__html: md.render(this.props.description)}}>
            </p>
          </div>
        </header>
        <hr/>
        <div id="content">
          {
            posts
          }
        </div>
      </div>
    );
  }
}
export default class App extends React.Component {
  render() {
    const self = this;
    return (
      <HashRouter>
        <div>
          <Route cache index path="/home" component={Home} title={self.props.title} description={self.props.description} posts={this.props.posts}></Route>
          <Route path="/post/:postId" component={(props) => {
            let post = null;
            self.props.posts.forEach(item => {
              if (item.id === props.params.postId) {
                post = item;
              }
            });
            {/* console.log(post ? post.src : ''); */}
            return (
              <Post title={self.props.title} src={post ? post.src : ''} name={post ? post.name : ''} date={post ? post.date : new Date()}/>
            );
          }}></Route>
        </div>
      </HashRouter>
    );
  }
}

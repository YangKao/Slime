import React from 'react';
import ReactDOM from 'react-dom';
import App from './theme/Mage';
import Config from '../config';
import mD from 'markdown-it';
import mk from 'markdown-it-mathjax';
const md = mD();
md.use(mk());

window.particlesJS.load('background', '/particles.json', function() {});

class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }
  async componentDidMount() {
    const raw = await fetch('https://api.github.com/repos/YangKao/math/contents/');
    const raw2 = await fetch('https://api.github.com/repos/YangKao/glblog/contents/');
    const json = await raw.json();
    const json2 = await raw2.json();
    const posts = (json.concat(json2)).map(item => {
      const info = item.name.split('-');
      const date = new Date();
      date.setFullYear(info[0]);
      date.setMonth(info[1] - 1);
      date.setDate(info[2]);
      return {
        name: info[3].slice(0, info[3].length - 3),
        src: item.download_url,
        id: item.sha,
        date: date
      };
    });
    posts.sort((a, b) => {
      return a.date < b.date;
    });
    await this.setStateAsync({
      posts: posts
    });
  }
  render() {
    return <App posts={this.state.posts} title={Config.title} description={Config.description}/>;
  }
}

ReactDOM.render(<Page />, document.getElementById('app'));

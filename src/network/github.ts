export interface IPost {
    name: string,
    src: string,
    id: string,
    date: Date,
}

// @ts-ignore
export const getPosts = async (repo: string): IPost[] => {
    const raw = await fetch(`https://api.github.com/repos/${repo}/contents/`);
    const json = await raw.json();

    const posts = json.map(item => {
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
        } as IPost;
    }) as IPost[];

    posts.sort((a, b) => {
        return a.date.getTime() - b.date.getTime();
    });

    return posts;
};

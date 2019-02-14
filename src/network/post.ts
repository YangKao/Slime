// @ts-ignore
export const getPost = async (src: string): Promise<string> => {
    const raw = await fetch(src);
    return await raw.text();
};

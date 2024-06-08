const fetchHackerNews = async () => {
    const result = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json",
    );

    if(!result.ok) {
        throw new Error('Hackernews Top fetch is not okay')
    }

    const data = await result.json();
    const top = data.slice(0, 10);

    const newsArray = await Promise.all(
        top.map(async (news) => {
            const newsResult = await fetch(
                `https://hacker-news.firebaseio.com/v0/item/${news}.json?print=pretty`,
            );

            if (!newsResult.ok) {
                throw new Error('Failed to fetch news item');
            }

            return await newsResult.json();
        }),
    );

    return newsArray
}

export default fetchHackerNews
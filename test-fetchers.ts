import { fetchHackerNews, fetchDevTo, fetchGitHub, fetchReddit } from './modules/trending/source-fetcher';

async function test() {
  console.log("Testing HN...");
  const hn = await fetchHackerNews(["react", "startup"], 5);
  console.log("HN items:", hn.length, hn[0]);

  console.log("Testing DevTo...");
  const dev = await fetchDevTo(["react", "startup"], 5);
  console.log("DevTo items:", dev.length, dev[0]);

  console.log("Testing GitHub...");
  const gh = await fetchGitHub(["react", "startup"], 5);
  console.log("GitHub items:", gh.length, gh[0]);

  console.log("Testing Reddit...");
  const rd = await fetchReddit(["react", "startup"], 5);
  console.log("Reddit items:", rd.length, rd[0]);
}

test().catch(console.error);

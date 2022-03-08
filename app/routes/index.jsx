import { Link, useLoaderData } from 'remix';
import slugify from 'slugify';
import NetlifyGraph from '../../netlify/functions/netlifyGraph';

export const loader = async () => {
  const { data } = await NetlifyGraph.fetchIssues(
    { owner: 'Fran-A-Dev', name: 'netlifygraph-ghub' },
    { accessToken: process.env.ONEGRAPH_AUTHLIFY_TOKEN }
  );

  return data.gitHub.repository.issues.edges.map(({ node }) => {
    return {
      ...node,
      slug: slugify(node.title).toLowerCase()
    };
  });
};

export default function Index() {
  let data = useLoaderData();

  return (
    <div>
      <h1>Issues</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <Link to={item.slug}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

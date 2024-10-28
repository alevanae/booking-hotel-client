import Cities from "../comps/Cities";
import Properties from "../comps/Properties";
import Hotels from "../comps/Hotels";

import Layout from "../comps/Layout";

function Home() {
  return (
    <Layout>
      <Cities />
      <Properties />
      <Hotels />
    </Layout>
  );
}

export default Home;

import styles2 from "../styles/Dashboard.module.css";

import Image from "next/image";
// Local image, height & width automatically used
import StockPic from "../public/hagley-park-1.jpeg";

const Feed = () => (
  <div className={`${styles2.feed} ${styles2.mainChild}`}>
    <h2>Feed</h2>
    <div className={styles2.feedItem}>
      <p>
        <span className={styles2.feedItemPoster}>Example member</span> posted:
      </p>
      <p className={styles2.feedItemTime}>1 hr 12 m ago</p>
      <Image src={StockPic} alt="Hagley Park" />
      <div className={styles2.feedItemBody}>
        <p>Lorem ipsum...</p>
        <div className={styles2.feedItemButtons}>
          <button>Button 1</button>
          <button>Button 2</button>
          <button>Button 3</button>
        </div>
      </div>
    </div>
  </div>
);

export default Feed;

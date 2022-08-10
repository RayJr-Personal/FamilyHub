import styles2 from "../styles/Dashboard.module.css";

const Feed = () => (
  <div className={`${styles2.feed} ${styles2.mainChild}`}>
    <h2>Feed</h2>
    <div className={styles2.feedItem}>
      <p>
        <span className={styles2.feedItemPoster}>Example member</span> posted:
      </p>
      <p className={styles2.feedItemTime}>1 hr 12 m ago</p>
      <div className={styles2.feedItemBody}>
        <p>insert picture here</p>
        <p>Lorem ipsum...</p>
      </div>
    </div>
  </div>
);

export default Feed;

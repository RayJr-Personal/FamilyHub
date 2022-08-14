import Image from "next/image";

const footer = {
  display: "flex",
  flex: 1,
  padding: "2rem 0",
  borderTop: "1px solid #eaeaea",
  alignItems: "center",
};

const footerLink = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 1,
};

const logo = {
  height: "1em",
  marginLeft: "0.5rem",
};

const Feed = () => (
  <footer style={footer}>
    <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
      style={footerLink}
    >
      Powered by{" "}
      <span style={logo}>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </span>
    </a>
  </footer>
);

export default Feed;

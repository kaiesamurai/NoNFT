export default function RawFooter() {
  return (
    <div
      className="infoLine"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "50px",
        }}
      >
        <a href="https://wotori.com" target="_blank">
          Wotori Studio
        </a>
        <p style={{ margin: 0 }}>{new Date().getFullYear()}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a href="https://t.me/+emOypt4PyeMxZGMy" target="_blank">
          Telegram
        </a>
        <a href="https://ekza.space/ppt/wotori-pitchdeck.pdf" target="_blank">
          about
        </a>
      </div>

      {/* <div>
        <p>Login</p>
      </div> */}
    </div>
  );
}

import { useClient, useMemo } from "seniman";
import { createServer } from "seniman/server";
import { Style } from "seniman/head";
import Counter from "./Counter";
import Party from "./Party";

const tailwindCssText = await Bun.file("./dist/style.css").text();

function Body() {
  let client = useClient();

  let pageType = useMemo(() => {
    let pathname = client.location.pathname();

    if (pathname === "/") {
      return "counter";
    } else if (pathname === "/party") {
      return "party";
    } else {
      return "404";
    }
  });

  return (
    <div class="flex" style={{ height: "100vh" }}>
      <Style text={tailwindCssText} />
      {() => {
        // This function is re-run only when pageType changes
        switch (pageType()) {
          case "counter":
            return <Counter />;
          case "party":
            return <Party />;
          default:
            return <div>404</div>;
        }
      }}
    </div>
  );
}

let server = createServer({ Body });

server.listen(3002);

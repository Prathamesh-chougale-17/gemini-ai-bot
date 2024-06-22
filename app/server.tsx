import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";

const ServerComponent = ({ item }: { item: string }) => {
  return (
    <div>
      {" "}
      <MDXRemote
        components={{
          p: (props) => <p className="text-left" {...props} />,
        }}
        source={item}
      />
    </div>
  );
};

export default ServerComponent;

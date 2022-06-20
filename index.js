marked.setOptions({
  breaks: true,
});

const renderer = new marked.Renderer();

function App() {
  const [text, setText] =
    React.useState(`# Welcome to my React Markdown Previewer!

## This is a sub-heading...

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. So it makes list!`);

  return (
    <div className="app">
      <Editor text={text} setText={setText} />
      <Previewer text={text} />
    </div>
  );
}

function Editor(props) {
  return (
    <div className="editor-wrapper">
      <Header name="Editor" />
      <textarea
        id="editor"
        className="editor-textarea"
        onChange={(e) => props.setText(e.target.value)}
        value={props.text}
      />
    </div>
  );
}

function Previewer(props) {
  return (
    <div className="previewer-wrapper">
      <Header name="Previewer" />
      <div
        dangerouslySetInnerHTML={{
          __html: marked(props.text, { renderer: renderer }),
        }}
        className="previewer-text"
      ></div>
    </div>
  );
}

function Header(props) {
  const handleClick = (e) => {
    if (props.name === "Editor" && e.target.className.includes("maximize")) {
      e.target.className = "fa-solid fa-minimize";
      document.querySelector(".editor-wrapper").className =
        "editor-wrapper maximize";
      document.querySelector(".previewer-wrapper").className =
        "previewer-wrapper hide";
    } else if (
      props.name === "Editor" &&
      e.target.className.includes("minimize")
    ) {
      e.target.className = "fa-solid fa-maximize";
      document.querySelector(".editor-wrapper").className = "editor-wrapper";
      document.querySelector(".previewer-wrapper").className =
        "previewer-wrapper";
    }

    if (props.name === "Previewer" && e.target.className.includes("maximize")) {
      e.target.className = "fa-solid fa-minimize";
      document.querySelector(".previewer-wrapper").className =
        "previewer-wrapper maximize";
      document.querySelector(".editor-wrapper").className =
        "editor-wrapper hide";
    } else if (
      props.name === "Previewer" &&
      e.target.className.includes("minimize")
    ) {
      e.target.className = "fa-solid fa-maximize";
      document.querySelector(".previewer-wrapper").className =
        "previewer-wrapper";
      document.querySelector(".editor-wrapper").className = "editor-wrapper";
    }
  };

  return (
    <div className="header">
      <p>{props.name}</p>
      <i onClick={(e) => handleClick(e)} className="fa-solid fa-maximize"></i>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));

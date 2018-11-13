import ReactQuill, { Quill } from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import React from "react";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import TextInput from "../inputi/textInput";
import UploadSliku from "./UploadSliku";
import { DugmeZeleno } from "../layout/dugme";
import Slika from "../slika/slika";
import {
  dohvatiMojuObjavu,
  novaObjava,
  editObjavu
} from "../akcije/objavaAkcije";
var Block = Quill.import("blots/block");
Block.tagName = "DIV";
Quill.register(Block, true);
var ColorClass = Quill.import("attributors/class/color");
var SizeStyle = Quill.import("attributors/style/size");
Quill.register(ColorClass, true);
Quill.register(SizeStyle, true);
Quill.register(Quill.import("attributors/style/direction"), true);
Quill.register(Quill.import("attributors/style/align"), true);
class NovaObjava extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      open: false,
      naslovnaSlika: null,
      error: null,
      errorSlika: null,
      errorText: null
    }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.dohvatiMojuObjavu(this.props.match.params.id);
  }
  componentWillUnmount() {
    console.log("unmount");
  }
  componentDidUpdate() {
    if (!this.props.match.params.id) {
      this.props.editObjavu({});
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.objava) {
      this.setState({
        text: nextProps.objava.objava
      });
    }
    if (nextProps.objava.naslovSlika) {
      this.setState({
        naslovnaSlika: nextProps.objava.naslovSlika
      });
    }
  }
  imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      var range = this.quillRef.getEditor().getSelection();
      const file = input.files[0];
      this.quillRef.getEditor().getSelection(range.index + 1);
      const response = await UploadSliku(file);
      console.log(response, "objava");

      this.quillRef.getEditor().insertEmbed(range.index, "image", response);
      // Save current cursor state

      // // Insert temporary loading placeholder image
      // quillRef.insertEmbed(range.index, 'image', `${ window.location.origin }/images/loaders/placeholder.gif`);

      // // Move cursor to right side of image (easier to continue typing)

      // const res = await apiPostNewsImage(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

      // // Remove placeholder image
      // quillRef.deleteText(range.index, 1);

      // Insert uploaded image
    };
  };
  modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: ["", "center", "right", "justify"] }],
        ["link", "image", "video"],
        ["clean"]
      ],
      handlers: {
        image: this.imageHandler
      }
    }
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",

    "link",
    "image",
    "video",
    "clean",
    "align"
  ];

  handleChange(value) {
    this.setState({ text: value });
  }
  submit = async naslov => {
    if (!naslov.naslov) {
      this.setState({ error: "Moras Upisati naslov" });
      return;
    }
    if (naslov.naslov && naslov.naslov.length < 5) {
      this.setState({ error: "Naslov mora imati barem 5 slova" });
      return;
    }
    if (!this.state.naslovnaSlika) {
      this.setState({ error: null });

      this.setState({
        errorSlika: true
      });
      return;
    }
    if (this.state.text.length < 10) {
      this.setState({
        errorText: true
      });
      return;
    }
    const podaci = {
      naslov: naslov.naslov,
      objava: this.state.text,
      naslovSlika: this.state.naslovnaSlika
    };
    this.props.novaObjava(podaci, this.props.history.push);
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  handleOpen = () => {
    this.setState({
      open: true
    });
  };
  naslovnaSlikaDodaj = slika => {
    this.setState({ naslovnaSlika: slika });
    if (slika) {
      this.setState({ open: false });
      this.setState({ errorSlika: null });
    }
  };

  render() {
    console.log(this.state.text, "text");

    console.log(this.state.open);
    const { handleSubmit } = this.props;
    const { open, naslovnaSlika, error, errorSlika } = this.state;
    console.log(naslovnaSlika);

    return (
      <Grid container style={{ marginTop: "7rem" }}>
        <Grid container justify="center">
          <form
            autoComplete="off"
            style={{ width: "100%", textAlign: "center" }}
            onSubmit={handleSubmit(this.submit)}
          >
            <Grid item xs={12} style={{ paddingBottom: "1rem" }}>
              <Field
                label="Upisi naslov objave"
                type="text"
                name="naslov"
                noviError={error}
                component={TextInput}
              />
            </Grid>

            <DugmeZeleno akcija={this.handleOpen} text="Dodaj sliku" />
            {naslovnaSlika && (
              <img
                src={naslovnaSlika}
                alt="Nista"
                style={{
                  display: "block",
                  height: "20rem",
                  width: "100%",
                  maxWidth: "40rem",
                  margin: "0 auto",
                  marginTop: "1rem",
                  padding: "0.5rem"
                }}
              />
            )}
            {errorSlika && (
              <Typography style={{ color: "red", fontSize: "3rem" }}>
                {" "}
                Moras Odabrati sliku da bi zavrsio objavu
              </Typography>
            )}
            <Slika
              prebaciSlikuObjava={this.naslovnaSlikaDodaj}
              objava={true}
              open={open}
              handleClose={() => this.handleClose}
            />

            <Grid item xs={12} style={{ margin: "1rem 0" }}>
              <ReactQuill
                ref={el => (this.quillRef = el)}
                value={this.state.text || ""}
                onChange={this.handleChange}
                modules={this.modules}
                formats={this.formats}
              />
              {this.state.errorText && (
                <Typography style={{ color: "red", fontSize: "3rem" }}>
                  Moras upisati barem 10 slova
                </Typography>
              )}
            </Grid>
            <DugmeZeleno type="submit" text={"submit"} />
          </form>
        </Grid>

        <Grid item xs={12}>
          <div
            className="halo"
            style={{ width: "100vw" }}
            dangerouslySetInnerHTML={{ __html: this.state.text }}
          />
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  objava: state.objave.mojaObjava,
  initialValues: state.objave.mojaObjava
});

const mapDispatchToProps = {
  dohvatiMojuObjavu,
  novaObjava,
  editObjavu
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "objava", enableReinitialize: true })(NovaObjava));

import mongoURI2 from "./prod.js";
import mongoURI1 from "./dev.js";
let mongoURI;

if (process.env.NODE_ENV === "production") {
  mongoURI = mongoURI2;
} else {
  mongoURI = mongoURI1;
}

export default mongoURI;

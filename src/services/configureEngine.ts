import { EnginePath } from "../interfaces";

export const engineAndPath: EnginePath = {
  path: "",
  engine: "",
};

export default async function configureEngine(options: EnginePath) {
  console.log("service.configureEngin", options)
  switch (options.engine) {
    case "json":
      engineAndPath.path = options.path + ".json";
      break;
    case "sqlite":
      engineAndPath.path = options.path + ".db";
      break;
    case "mysql":
      break;
    default:
      throw new Error(
        "Unknown engine: " +
          options.engine +
          ". Please specify the right engine"
      );
  }
  engineAndPath.engine = options.engine;
}


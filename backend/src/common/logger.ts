import pino from "pino";
import Config from "config";

const getInstance = (config: { name: string }): any => {
  const instance: pino.Logger = pino({
    prettyPrint: Config.get<any>("logger.prettyPrint"),
    level: Config.get<string>("logger.level")
  });
  return instance.child(config);
};

const Logger = {
  getInstance
};

export default Logger;

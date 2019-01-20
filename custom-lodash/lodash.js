import { toPairs } from "./lib/toPairs";
import { merge } from "./lib/merge";
import { omitBy } from "./lib/omitBy";
import { omit } from "./lib/omit";
import { pickBy } from "./lib/pickBy";
import { pick } from "./lib/pick";
import { zip } from "./lib/zip";
import { map } from "./lib/map";
import { includes } from "./lib/includes";
import { find } from "./lib/find";
import { filter } from "./lib/filter";
import { take } from "./lib/take";
import { dropWhile } from "./lib/dropWhile";
import { drop } from "./lib/drop";
import { chunk } from "./lib/chunk";
import { compact } from "./lib/compact";

const lodash = {};

lodash.toPairs = toPairs;
lodash.merge = merge;
lodash.omitBy = omitBy;
lodash.omit = omit;
lodash.pickBy = pickBy;
lodash.pick = pick;
lodash.zip = zip;
lodash.map = map;
lodash.includes = includes;
lodash.find = find;
lodash.filter = filter;
lodash.take = take;
lodash.dropWhile = dropWhile;
lodash.drop = drop;
lodash.chunk = chunk;
lodash.compact = compact;

const _ = lodash;

export { _ };

import { Engine } from "../modules/engine"
import { Backend } from "../modules/backend"
import { Store } from "../modules/store"
import { Event } from "../modules/event"
import { Media } from "../modules/media"
import { Format } from "../modules/format"

import { SinusbotMeta, ConfigMetaData } from "./meta"

declare global {
  /**
   * ```typescript
   * registerPlugin({
   *  name: "Example",
   *  version: "1.0.0",
   *  description: "simple showcase",
   *  author: "John Doe <john.doe@example.com>"
   * }, () => {
   *  const engine = require("engine")
   *  engine.log("Hello World!")
   * })
   * ```
   * @param meta basic script informations
   * @param callback script environment
   */
  function registerPlugin(meta: SinusbotMeta, callback: (sinusbot: null, config: ConfigMetaData, meta: SinusbotMeta) => void) :void

  function require(name: "engine"): typeof Engine
  function require(name: "backend"): typeof Backend
  function require(name: "store"): typeof Store
  function require(name: "event"): typeof Event
  function require(name: "media"): typeof Media
  /** @todo function require(name: "audio"): typeof Audio */
  function require(name: "format"): typeof Format
  /** @todo function require(name: "helpers"): typeof Helpers */
  /** @todo function require(name: "http"): typeof Http */
  /** @todo function require(name: "net"): typeof Net */
  /** @todo function require(name: "ws"): typeof WebSocket */
  /** @todo function require(name: "db"): typeof DataBase */
  /** @todo function require(name: "fs"): typeof FileSystem */
  /** @todo function require(name: "graphics"): typeof Graphics */
  /** @todo function require(name: "crypto"): typeof Crypto */
}
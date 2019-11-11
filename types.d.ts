/**
 * @module audio
 */
declare module "audio" {
    /**
     * @description Applies a [ffmpeg filter](https://ffmpeg.org/ffmpeg-filters.html) to the audio output.
     *
     * Warning: This method is curretly **not safe to use** and **leads to crashes**!
     * @param {string} filter - ffmpeg compatible filter string
     * @returns {boolean} success
     */
    function setAudioFilter(filter: string): boolean;
    /**
     * @description Enables or disables audio return channel; required for speech recognition engine / recording
     * @param {number} flags - bitmask; use 0x01 for general audio return (recording) or 0x02 for separated audio (for speech recognition) - 0x03 for both
     * @returns {boolean}
     * @since 0.13.37
     */
    function setAudioReturnChannel(flags: number): boolean;
    /**
     * @returns {number}
     * @since 0.13.37
     */
    function getAudioReturnChannel(): number;
    /**
     * @description Starts recording to a file
     * @returns {boolean}
     */
    function startRecording(): boolean;
    /**
     * @description Stops recording to a file
     * @returns {boolean}
     */
    function stopRecording(): boolean;
    /**
     * @description Streams audio output to an icecast-server
     * @param {string} url - Endpoint to stream to
     * @param {string} username - Username used for authentication
     * @param {string} password - Password
     * @returns {boolean}
     */
    function streamToServer(url: string, username: string, password: string): boolean;
    /**
     * @description Stops streaming started with streamToServer
     * @returns {boolean}
     */
    function stopStream(): boolean;
    /**
     * Returns the state of repeat-mode
     * @returns {boolean}
     */
    function isRepeat(): boolean;
    /**
     * @description Sets the state of repeat-mode
     * @param {boolean} val
     */
    function setRepeat(val: boolean): void;
    /**
     * Returns the state of shuffle-mode
     * @returns {boolean}
     */
    function isShuffle(): boolean;
    /**
     * @description Sets the state of shuffle-mode
     * @param {boolean} val
     */
    function setShuffle(val: boolean): void;
    /**
     * Returns the current volume (0-100)
     * @returns {number} volume
     */
    function getVolume(): number;
    /**
     * @description Sets the volume (0-100)
     * @param {number} volume
     * @returns {boolean}
     */
    function setVolume(volume: number): boolean;
    /**
     * Returns the position of the current track
     * @returns {number} position (in seconds)
     */
    function getTrackPosition(): number;
    /**
     * @description Seeks to a specific position
     * @param {number} pos - New position (in seconds)
     */
    function seek(pos: number): void;
    /**
     * Returns if the audio output has been muted
     * @returns {boolean}
     */
    function isMute(): boolean;
    /**
     * @description Enables/disables mute
     * @param {boolean} mute
     * @returns {boolean}
     */
    function setMute(mute: boolean): boolean;
    /**
     * @returns {boolean} Whether the bot is playing music
     */
    function isPlaying(): boolean;
    /**
     * @description Plays audio returned from the text-to-speech engine
     * @param {string} text - Text to say
     * @param {string} [locale] - Locale to use
     */
    function say(text: string, locale?: string): void;
    /**
     * @description Sets the volume of a specific stream (0-100)
     * @param {string} streamID - name or alias of the stream(s) to modify
     * @param {number} volume
     * @returns {boolean}
     */
    function setStreamVolume(streamID: string, volume: number): boolean;
    /**
     * @since 1.0.0-beta.6
     * @description Sets the TTS URL
     * @param {string} url - TTS URL
     * @returns {boolean}
     */
    function setTTSURL(url: string): boolean;
    /**
     * @since 1.0.0-beta.6
     * @description Sets the TTS default locale
     * @param {string} locale - Locale
     * @returns {boolean}
     */
    function setTTSDefaultLocale(locale: string): boolean;
}

/**
 * @module backend
 */
declare module "backend" {
    /**
     * @description Connects to the server
     * @returns {boolean}
     */
    function connect(): boolean;
    /**
     * @description Disconnects from the server
     * @returns {boolean}
     */
    function disconnect(): boolean;
    /**
     * Returns true if the backend is connected to a server
     * @returns {boolean}
     */
    function isConnected(): boolean;
    /**
     * @returns {string} Current bots' unique identifier
     */
    function getBotClientID(): string;
    /**
     * @returns {Client} Client of the bot
     */
    function getBotClient(): Client;
    /**
     * Returns the actual nickname; To get the configured nickname, use engine.getNick() instead.
     * @returns {string}
     */
    function getNick(): string;
    /**
     * Returns a channel if found
     * @param {string} id
     * @returns {Channel}
     * @example
     * var backend = require('backend');
     * var channel = backend.getChannelByID('6');
     */
    function getChannelByID(id: string): Channel;
    /**
     * Returns the (primary) channel the bot is in
     * @returns {Channel}
     * @example
     * var backend = require('backend');
     * var channel = backend.getCurrentChannel();
     */
    function getCurrentChannel(): Channel;
    /**
     * Returns the matching channel if found
     * @param {string} name
     * @returns {Channel?}
     * @see Backend#getChannelsByName()
     * @example
     * var backend = require('backend');
     * var channel = backend.getChannelByName('Welcome Channel');
     */
    function getChannelByName(name: string): Channel;
    /**
     * Returns an array of channels matching the name
     * @param {string} name
     * @returns {Channel[]}
     * @since 0.14.0
     * @example
     * var backend = require('backend');
     * var channels = backend.getChannelsByName('foobar');
     */
    function getChannelsByName(name: string): Channel[];
    /**
     * Returns the total number of channels
     * @returns {number}
     * @example
     * var backend = require('backend');
     * var count = backend.getChannelCount();
     */
    function getChannelCount(): number;
    /**
     * Returns all channels
     * @returns {Channel[]}
     * @example
     * // Logs the name of all channels
     *
     * var backend = require('backend');
     * var engine = require('engine');
     * var channels = backend.getChannels();
     *
     * channels.forEach(function(channel) {
     *     engine.log(channel.name());
     * });
     */
    function getChannels(): Channel[];
    /**
     * Returns all clients
     * @returns {Client[]}
     * @example
     * // Gets a list of all clients and sends them a message
     *
     * var backend = require('backend');
     * var clients = backend.getClients();
     *
     * clients.forEach(function(client) {
     *     client.chat('Hello ', + client.name() + '. I\'m a SinusBot!');
     * });
     */
    function getClients(): Client[];
    /**
     * Returns a client by its temporary ID (changes when the client reconnects)
     * @param {string} id
     * @returns {Client}
     */
    function getClientByID(id: string): Client;
    /**
     * Returns a client by its name/nickname
     * @param {string} name
     * @returns {Client}
     */
    function getClientByName(name: string): Client;
    /**
     * Alias of getClientByName
     * @param {string} name
     * @returns {Client}
     */
    function getClientByNick(name: string): Client;
    /**
     * Returns an (online) client by its permanent id
     * @param {string} uniqueID
     * @returns {Client}
     */
    function getClientByUniqueID(uniqueID: string): Client;
    /**
     * Alias of getClientByUniqueID
     * @param {string} uniqueID
     * @returns {Client}
     */
    function getClientByUID(uniqueID: string): Client;
    /**
     * @description Sends a message to the server
     * @param {string} msg - Message to send
     * @example
     * var backend = require('backend');
     * backend.chat('Hello from SinusBot!');
     */
    function chat(msg: string): void;
    /**
     * @description Creates a new channel
     * @since 0.9.16.3
     * @param {ChannelParams} channelParams
     * @returns {Channel} - Channel which was created
     */
    function createChannel(channelParams: ChannelParams): Channel;
    /**
     * Returns a servergroup by its ID
     * @param {string} id - ServerGroup ID
     * @returns {ServerGroup}
     */
    function getServerGroupByID(id: string): ServerGroup;
    /**
     * Returns a channelgroup by its ID
     * @param {string} id - ChannelGroup ID
     * @returns {ChannelGroup}
     */
    function getChannelGroupByID(id: string): ChannelGroup;
    /**
     * Returns an array of all known server groups
     * @returns {ServerGroup[]}
     */
    function getServerGroups(): ServerGroup[];
    /**
     * Returns an array of all known channel groups
     * @returns {ChannelGroup[]}
     */
    function getChannelGroups(): ChannelGroup[];
    /**
     * Returns the specific functions for Discord or TeamSpeak3
     * @since 1.0.0-alpha.6
     * @returns {Extended}
     */
    function extended(): Extended;
    /**
     * Set the bot client as away on TeamSpeak.
     * @param {boolean} away
     * @param {string} reason
     * @returns {boolean} success
     */
    function setAway(away: boolean, reason: string): boolean;
    /**
     * Either {@link ExtendedDiscord} or {@link ExtendedTS3}
     * @interface Extended
     * @see {ExtendedDiscord}
     * @see {ExtendedTS3}
     * @implements {ExtendedDiscord}
     * @implements {ExtendedTS3}
     */
    interface Extended extends ExtendedDiscord, ExtendedTS3 {
    }
}

/**
 * @module crypto
 * @since 1.0.0
 * @todo TODO: add some explanations and examples
 */
declare module "crypto" {
    /**
     * Generates a new {@link CryptoKeypair}.
     * @returns {CryptoKeypair} New {@link CryptoKeypair}.
     */
    function generateKeypair(): CryptoKeypair;
    /**
     * Loads a keypair from bytes and returns it as a {@link CryptoKeypair}.
     * @param {BytesWriter} keypair Keypair bytes.
     * @returns {CryptoKeypair}
     */
    function loadKeypair(keypair: BytesWriter): CryptoKeypair;
    /**
     * @todo TODO: add some explanations
     * Encrypts a message.
     * @param {BytesWriter} secret Secret
     * @param {BytesWriter} message Message
     * @returns {BytesWriter} Encrypted message
     */
    function seal(secret: BytesWriter, message: BytesWriter): BytesWriter;
    /**
     * @todo TODO: add some explanations
     * Decrypts a message.
     * @param {BytesWriter} secret Secret
     * @param {BytesWriter} message Message
     * @returns {BytesWriter} Decrypted message
     */
    function open(secret: BytesWriter, message: BytesWriter): BytesWriter;
    /**
     * @todo TODO: add some explanations
     * @todo TODO: What is hname for?
     * @param {string} hname
     * @param {BytesWriter} password The master password from which a derived key is generated.
     * @param {BytesWriter} salt Salt.
     * @param {number} iterations Number of iterations.
     * @param {number} keylength Desired bit-length of the derived key.
     * @todo TODO: Is this correct?
     * @returns {BytesWriter} Keypair bytes
     */
    function pbkdf2(hname: string, password: BytesWriter, salt: BytesWriter, iterations: number, keylength: number): BytesWriter;
    /**
     * Returns a given number of random bytes.
     * @param {number} number Number of random bytes to return
     * @returns {BytesWriter} Random bytes
     */
    function randomBytes(number: number): BytesWriter;
}

/**
 * @interface DBConn
 * @since 0.9.16.4
 */
declare interface DBConn {
    /**
     * @description
     * Use this, if you expect a result set;
     * Note: strings will be returned as byte arrays to be binary safe; to convert to actual strings, please use helpers.toString(column)
     * @param {string} queryString
     * @param {any} [parameters] - Zero or more parameters; e.g. for mysql, ? in the queryString will be replaced with these parameters
     * @param {dbQueryCallback} callback - Callback is called after the query has finished.
     */
    query(queryString: string, parameters?: any, callback: dbQueryCallback): void;
    /**
     * @description Use this insted of query if you don't expect a result
     * @param {string} queryString
     * @param {any} [parameters] - Zero or more parameters; e.g. for mysql, ? in the queryString will be replaced with these parameters
     * @param {dbQueryCallback} [callback]
     */
    exec(queryString: string, parameters?: any, callback?: dbQueryCallback): void;
}

/**
 * @callback dbQueryCallback
 * @see DBConn#query
 * @see DBConn#exec
 * @since 0.9.16.4
 * @description Gets called with two parameters, err and result - both are mutually exclusive.
 * Result contains an array of rows, each containing an object with the column names as key.
 * @param {string} [error]
 * @param {object[]} [result]
 */
declare type dbQueryCallback = (error?: string, result?: object[]) => void;

/**
 * @typedef {object} DBParams
 * @since 0.9.16
 * @property {string} driver - Database driver to use, sqlite3 (default; currently in-memory only), mysql or postgres
 * @property {string} [host] - Database server to connect to, required for mysql / postgres
 * @property {string} [username]
 * @property {string} [password]
 * @property {number} [port]
 */
declare type DBParams = {
    driver: string;
    host?: string;
    username?: string;
    password?: string;
    port?: number;
};

/**
 * @callback dbConnectCallback
 * @see module:db#connect
 * @since 0.9.16.4
 * @description If an error occured, exactly one parameter containing the error will be handed to the callback
 * @param {string} [error]
 */
declare type dbConnectCallback = (error?: string) => void;

/**
 * @module db
 * @since 0.9.16.4
 * @description
 * This module is protected. This means that you need to add `'db'` to `requiredModules` in your script's {@link Manifest} in {@link registerPlugin} in order to use it.
 *
 * Use additional parameters to exec / query whenever you use untrusted/unknown data, as those will automatically be escaped and avoid SQL injection.
 * @example
 * var db = require('db');
 * var engine = require('engine');
 * var helpers = require('helpers');
 * var dbc = db.connect({ driver: 'mysql', host: '127.0.0.1', username: 'demo', password: 'blah', database: 'foo' }, function(err) {
 *     if (err) {
 *          engine.log(err);
 *     }
 * });
 * if (dbc) dbc.exec("INSERT INTO blah (foo, foo2) VALUES (?, ?)", 'bar', 'bar2');
 * if (dbc) dbc.query("SELECT * FROM blah", function(err, res) {
 *     if (!err) {
 *          res.forEach(function(row) {
 *              engine.log(helpers.toString(row.foo));
 *          });
 *     }
 * });
 */
declare module "db" {
    /**
     * @param {DBParams} params - Connection parameters
     * @param {dbConnectCallback} callback - Callback gets called on success / error;
     * If an error occured, exactly one parameter containing the error will be handed to the callback
     * @returns {?DBConn} Database connection or null if failed
     */
    function connect(params: DBParams, callback: dbConnectCallback): DBConn;
}

/**
 * @module engine
 * @example
 * const engine = require('engine');
 * engine.log('Hello from a script!');
 */
declare module "engine" {
    /**
     * @returns {string} Current instances' unique identifier
     */
    function getInstanceID(): string;
    /**
     * @returns {string} Current bots' unique identifier
     */
    function getBotID(): string;
    /**
     * Returns the name of the used backend (e.g. "ts3" or "discord")
     * @returns {string} Backend
     */
    function getBackend(): string;
    /**
     * @description
     * sets the log level of the instance
     * ```
     * level | what gets logged
     * ------|-----------------
     *   0   | no log messages
     *   1   | errors only
     *   2   | errors and warnings
     *   3   | errors, warnings, information
     *   4   | ...
     *  10   | most verbose
     *  11   | most verbose + external backends
     * ```
     * @param {number} level - Log level to set
     * @returns {boolean}
     *
     */
    function setInstanceLogLevel(level: number): boolean;
    /**
     * @description
     * Sets the log level of the bot
     * ```
     * level | what gets logged
     * ------|-----------------
     *   0   | no log messages
     *   1   | errors only
     *   2   | errors and warnings
     *   3   | errors, warnings, information
     *   4   | ...
     *  10   | most verbose
     *  11   | most verbose + external backends
     * ```
     * @param {number} level - Log level to set
     * @returns {boolean}
     */
    function setBotLogLevel(level: number): boolean;
    /**
     * Returns the log level of the instance
     * @returns {number} The set loglevel
     */
    function getInstanceLogLevel(): number;
    /**
     * Returns the log level of the bot
     * @returns {number} The set loglevel
     */
    function getBotLogLevel(): number;
    /**
     * Reloads all scripts; requires the corresponding setting in the config.ini to be enabled
     * @returns {boolean}
     */
    function reloadScripts(): boolean;
    /**
     * Returns the configured nickname - to get the actual nickname, use the backend module
     * @returns {string}
     */
    function getNick(): string;
    /**
     * Sets the nick to a new value and updates it on the server
     * @param {string} nick - New nick
     * @returns {boolean}
     */
    function setNick(nick: string): boolean;
    /**
     * Gets the default channel ID
     * @returns {string}
     */
    function getDefaultChannelID(): string;
    /**
     * Sets the default channel by its ID
     * @param {string} channelID
     * @returns {boolean}
     */
    function setDefaultChannelID(channelID: string): boolean;
    /**
     * Returns true if the backend of this instance has been started
     * @returns {boolean}
     */
    function isRunning(): boolean;
    /**
     * Sends a notification to all users that are currently using the webinterface; use this for startup errors
     * @param {string} message - Message to send
     */
    function notify(message: string): void;
    /**
     * Stores the given object as configuration for the current script
     * @param {object} config
     * @returns {boolean}
     */
    function saveConfig(config: any): boolean;
    /**
     * Logs to stdout / instance log.
     *
     * Note:
     * - For some classes this may print `{}` because the values are returned by functions and not stored as properties.
     * - In recent versions numbers and some other types may be logged as `<nil>`.
     * To get the actual value in the log you need to convert it to a string first.
     * @param {...*} something
     * @example
     * const engine = require('engine');
     * engine.log('Hello from a script!');
     *
     * const a = 42;
     * const b = 1337;
     * // can be logged like this:
     * engine.log('a is ' + a + ', and b is ' + b + '.');
     * // or a bit nicer with an es6 templates string:
     * engine.log(`a is ${a}, and b is ${b}.`);
     * // see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/template_strings
     *
     * // examples of common mistakes:
     *
     * // converting an object to a string like this will *NOT* print what you want:
     * const cat = {says: 'meow'};
     * engine.log(`cat: ${cat}`); // => will print: "cat: [object Object]"
     * engine.log(cat); // => will (probably) print: "{"says":"meow"}"
     * // to print it's values you can also convert it to JSON:
     * engine.log(`cat: ${JSON.stringify(cat)}`); // => will print: "cat: {"says":"meow"}"
     *
     * // but this will not work with classes like Client or Channel!
     * engine.log(JSON.stringify(aClientObj)) // => will print: "{}"
     * engine.log(aClientObj) // => will print: "Client{ ID: <something>, Name: <irgendwr> }"
     * // but an array of clients/channels/... will NOT be printed as you would expect:
     * engine.log([aClientObj, aClientObj]) // => will print: "[{},{}]"
     */
    function log(...something: any[]): void;
    /**
     * @todo //TODO: What are the formatter options?
     * @param {string} format Format
     * @param {...*} something
     */
    function logf(format: string, ...something: any[]): void;
    /**
     * Exports an object, so other Scripts are able to use functions or values of the Script
     *
     * **Note:** Since SinusBot v1.0.0 you can now use the standard `module.exports = {...};` instead, as shown below.
     * @param {object} obj - object which should get exported
     * @example
     * // scriptname: exportscript.js
     * var publicvariable = 'I get exportet!';
     *
     * module.exports = {
     *     // returns the value of 'publicvariable'
     *     get: () => {
     *         return publicvariable;
     *     },
     *     // modifies the value of 'publicvariable'
     *     set: (value) => {
     *         publicvariable = value;
     *     }
     * };
     *
     * // ----------------------------------------------
     * // old way of exporting:
     * // var engine = require('engine');
     * // engine.export({
     * //     // returns the value of 'publicvariable'
     * //     get: function () {
     * //         return publicvariable;
     * //     },
     * //     // modifies the value of 'publicvariable'
     * //     set: function (value) {
     * //         publicvariable = value;
     * //     }
     * // })
     * // ----------------------------------------------
     * @example
     * // import in another script:
     * var event = require('event');
     * var engine = require('engine');
     * event.on('load', function() {
     *     // must always be loaded AFTER the 'load' event
     *     var script = require('exportscript.js');
     *     engine.log(script.get()); // logs 'I get exportet!'
     *     script.set('New Value');
     *     engine.log(script.get()); // logs 'New Value'
     * });
     */
    function export(obj: any): void;
    /**
     * @description
     * removes the current avatar image
     * @returns {boolean}
     */
    function removeAvatar(): boolean;
    /**
     * @description
     * sets the avatar image to the album art of a given track
     * @param {Track} track - Track to extract the album art from
     * @returns {boolean}
     */
    function setAvatarFromTrack(track: Track): boolean;
    /**
     * @description
     * sets the avatar image to the manually uploaded image
     * @returns {boolean}
     */
    function setDefaultAvatar(): boolean;
    /**
     * @description
     * sets the avatar to the rendered output of a banner template
     * @param {string} bannerName - banner template to use
     * @returns {boolean}
     * @since 0.12.0
     */
    function setAvatarFromBanner(bannerName: string): boolean;
    /**
     * @description
     * sets the avatar to the given image as URL
     * @param {string} url - image url
     * @returns {boolean}
     * @since 0.14.0
     */
    function setAvatarFromURL(url: string): boolean;
    /**
     * @description Gets the users of the SinusBot
     * @since 0.13.37
     * @returns {User[]}
     */
    function getUsers(): User[];
    /**
     * @description Gets a SinusBot user by his ID
     * @since 0.13.37
     * @param {string} id - ID of the SinusBot user
     * @returns {?User}
     */
    function getUserById(id: string): User;
    /**
     * @description Gets a Sinusbot user by his name.
     * @since 0.13.37
     * @param {string} name - Name of the user
     * @returns {?User}
     */
    function getUserByName(name: string): User;
    /**
     * @description Adds a user.
     * @since 1.0.0
     * @param {string} username
     * @returns {?User} User or undefined if a user with the same name already exists
     */
    function addUser(username: string): User;
    /**
     * @description Sets the command prefix.
     * @since 0.14.0
     * @param {string} prefix - Command prefix
     */
    function setCommandPrefix(prefix: string): void;
    /**
     * @description Gets the command prefix.
     * @since 0.14.0
     * @returns {string} Command prefix
     */
    function getCommandPrefix(): string;
    /**
     * @description Returns the SinusBot version.
     * @since 1.0.0
     * @returns {string} SinusBot version, for example: `1.0.0-alpha.7-a20212b`
     */
    function version(): string;
    /**
     * @since 1.0.0
     * @returns {string} OS (Operating-System, e.g. "linux")
     */
    function os(): string;
    /**
     * @description Disables the register command
     * @since 1.0.0
     */
    function disableRegistration(): void;
    /**
     * @description Enables the register command
     * @since 1.0.0
     */
    function enableRegistration(): void;
    /**
     * @description Returns whether registration is enabled
     * @since 1.0.0-beta.6
     * @returns {boolean} true if registration is enabled
     */
    function registrationEnabled(): boolean;
    /**
     * @returns {boolean}
     */
    function isSubscriptionMode(): boolean;
    /**
     * @returns {Channel[]}
     */
    function getChannelSubscriptions(): Channel[];
    /**
     * @returns {Client[]}
     */
    function getClientSubscriptions(): Client[];
    /**
     * @param {boolean} bool `true` to enable subscription-mode, `false` to disable it.
     * @since 1.0.0-beta.8
     */
    function setSubscriptionMode(bool: boolean): void;
    /**
     * @returns {boolean} wether ignore commands on specific chat has been set
     * @since 1.0.0-beta.9
     */
    function getIgnoreCommandsFromServerChat(): boolean;
    /**
     * the value of the checkbox from instance settings "ignore commands via channel-chat"
     * @returns {boolean} wether ignore setting has been set or not
     * @since 1.0.0-beta.9
     */
    function getIgnoreCommandsFromChannelChat(): boolean;
    /**
     * the value of the checkbox from instance settings "ignore commands via private message"
     * @returns {boolean} wether ignore setting has been set or not
     * @since 1.0.0-beta.9
     */
    function getIgnoreCommandsFromPrivateChat(): boolean;
    /**
     * set the value of the checkbox from instance settings "ignore commands via server-chat"
     * @param {boolean} bool reset/set specific setting
     * @since 1.0.0-beta.9
     */
    function setIgnoreCommandsFromServerChat(bool: boolean): void;
    /**
     * set the value of the checkbox from instance settings "ignore commands via channel-chat"
     * @param {boolean} bool reset/set specific setting
     * @since 1.0.0-beta.9
     */
    function setIgnoreCommandsFromChannelChat(bool: boolean): void;
    /**
     * set the value of the checkbox from instance settings "ignore commands via private message"
     * @param {boolean} bool reset/set specific setting
     * @since 1.0.0-beta.9
     */
    function setIgnoreCommandsFromPrivateChat(bool: boolean): void;
}

/**
 * @module event
 * @example
 * var event = require('event');
 * var engine = require('engine');
 *
 * event.on('chat', function(ev) {
 *     engine.log('Got message "'+ev.text +'" from '+ ev.client.name());
 * })
 */
declare module "event" {
    /**
     * @description Registers an event listener
     * @param {string} eventName - Event to listen to
     * @param {function} callback - Gets called when the given event is triggered
     */
    function on(eventName: string, callback: (...params: any[]) => any): void;
    /**
     * @description Emits an event to the current instance
     * @param {string} eventName - Name of the event to be emitted
     * @param {object} data - A data object to be sent with the event
     */
    function emit(eventName: string, data: any): void;
    /**
     * @description Emits an event to all instances
     * @param {string} eventName - Name of the event to be emitted
     * @param {object} data - A data object to be sent with the event
     */
    function broadcast(eventName: string, data: any): void;
}

/**
 * @module format
 */
declare module "format" {
    /**
     * @description Apply color if the backend supports it
     * @param {string} text - Text that should be colored
     * @param {string} color - Hex value of color to apply
     * @returns {string} Formatted string
     * @example
     * // Sends a red-colored message to the server chat (requires permission to do so)
     * var backend = require('backend');
     * var format = require('format');
     * backend.chat('This is SinusBot writing in ' + format.color('red', '#aa0000'));
     */
    function color(text: string, color: string): string;
    /**
     * @description Apply italic formatting to text
     * @param {string} text
     * @returns {string} Formatted string
     * @example
     * // Sends a formattes message to the server chat (requires permission to do so)
     * var backend = require('backend');
     * var format = require('format');
     * backend.chat('Part of this message is ' + format.italic('italic'));
     */
    function italic(text: string): string;
    /**
     * @description Apply bold formatting to text
     * @param {string} text
     * @returns {string} Formatted string
     * @example
     * // Sends a formattes message to the server chat (requires permission to do so)
     * var backend = require('backend');
     * var format = require('format');
     * backend.chat('Part of this message is ' + format.bold('bold'));
     */
    function bold(text: string): string;
    /**
     * @description Apply underlined formatting to text
     * @param {string} text
     * @returns {string} Formatted string
     * @example
     * // Sends a formatted message to the server chat (requires permission to do so)
     * var backend = require('backend');
     * var format = require('format');
     * backend.chat('Part of this message is ' + format.underline('underlined'));
     */
    function underline(text: string): string;
    /**
     * @description Formats text as code
     * @param {string} text
     * @returns {string} Formatted string
     */
    function code(text: string): string;
}

/**
 * @interface FileInfo
 * @since 1.0.0
 */
declare interface FileInfo {
    /**
     * @since 1.0.0
     * @returns {string} Base name of the file
     */
    name(): string;
    /**
     * @since 1.0.0
     * @returns {string} Length in bytes for regular files; system-dependent for others
     */
    size(): string;
    /**
     * @since 1.0.0
     * @returns {number} [File mode bits](https://en.wikipedia.org/wiki/Chmod#Numerical_permissions)
     */
    mode(): number;
    /**
     * @since 1.0.0
     * @returns {Date} Modification time
     */
    modTime(): Date;
    /**
     * @since 1.0.0
     * @returns {boolean} Returns if the file is a directory
     */
    isDir(): boolean;
}

/**
 * @module fs
 * @since 1.0.0
 * @description
 * This module is protected. This means that you need to add `'fs'` to `requiredModules` in your script's {@link Manifest} in {@link registerPlugin} in order to use it.
 *
 */
declare module "fs" {
    /**
     * @description Checks if a file exists
     * @since 1.0.0
     * @param {string} path - Path to the file (for example `/var/www/html/foo.txt`)
     * @return {boolean}
     */
    function exists(path: string): boolean;
    /**
     * @description Reads the content of a file
     * @since 1.0.0
     * @param {string} path - Path to the file
     * @return {Bytes}
     */
    function readFile(path: string): Bytes;
    /**
     * @description Writes data to a file
     * @since 1.0.0
     * @param {string} path - Path to the file
     * @param {BytesWriter} data - Data as Bytes, e.g. created by `helpers.bytesFromString()` or similar functions
     * @param {number} mode - File mode bits
     * @return {boolean} success
     */
    function writeFile(path: string, data: BytesWriter, mode: number): boolean;
    /**
     * @description Returns information about a file
     * @since 1.0.0
     * @param {string} path - Path to the file
     * @return {FileInfo} FileInfo
     */
    function stat(path: string): FileInfo;
    /**
     * @description Returns information about all files in a dirictory
     * @since 1.0.0
     * @param {string} path - Path to the directory
     * @return {FileInfo[]} Array of FileInfo
     */
    function readDir(path: string): FileInfo[];
    /**
     * @description Deletes a file or directory
     * @since 1.0.0
     * @param {string} path - Path to the file or directory
     * @return {boolean} success
     */
    function remove(path: string): boolean;
    /**
     * @description Creates a directory
     * @since 1.0.0
     * @param {string} path - Path of the directory
     * @return {boolean} success
     */
    function mkDir(path: string): boolean;
    /**
     * @description Creates every missing directory in a path
     * @since 1.0.0
     * @param {string} path - Path of the directory
     * @return {boolean} success
     */
    function mkDirAll(path: string): boolean;
    /**
     * @description Deletes a file or directory
     * @since 1.0.0
     * @param {string} path - Path to the file or directory
     * @param {string} newPath - New path to the file or directory
     * @return {boolean} success
     */
    function rename(path: string, newPath: string): boolean;
}

/**
 * @interface
 * @typedef {object} Manifest
 * @see registerPlugin
 * @property {string} name - Short name of your script
 * @property {string} author - Your name and your email address in the form of: `your name <your-email@example.com>`
 * @property {string} description - A longer description - tell the user what exactly your script does
 * @property {string} version - Start with something like 1.0 and increase it with every release
 * @property {boolean} [autorun] - Set to true, if you want the script to be run on every instance, without the option to disable it.
 * @property {string[]} [backends]
 * Per default scripts will only be available on TS3 instances.
 * If your script supports Discord (or in the future maybe other backends) as well, you have to specify this explicitly by setting this variable to an array containing all backends: `backends: ["ts3", "discord"]`
 * @property {boolean} [enableWeb]
 * If your script required own web content, you can set enableWeb to true and put files into the ./scripts/scriptname/html directory.
 * After restart, the script title will be clickable and lead to an index.html inside that html-directory you just created.
 *
 * From there you have access to the localStorage variables containing the login and may communicate with the bot api from your own pages.
 * @property {string} [engine] - Sets the required engine version (bot version). This uses [Semantic Versioning](https://semver.org). Example: `engine: ">= 0.9.16"`
 * @property {boolean} [hidden]
 * Hides the script from the settings page. Should be used together with autorun.
 *
 * Hidden scripts can not have variables (vars), since they'd never be shown and thus not configurable.
 * @property {string[]} [requiredModules]
 * An array of protected modules (i.e. 'http' or 'db') that the script requires.
 * @property {object[]} [vars] - More information about the usage of variables can be found [here](https://sinusbot.github.io/docs/scripts/#vars-array).
 * @property {string[]} [voiceCommands]
 * This parameter is only used for the speech recognition feature and may contain one or more strings that are to be detected for the given script.
 * You can find more details on how to use it here: [Speech Recognition](https://sinusbot.github.io/docs/speechrecognition/)
 */
declare type Manifest = {
    name: string;
    author: string;
    description: string;
    version: string;
    autorun?: boolean;
    backends?: string[];
    enableWeb?: boolean;
    engine?: string;
    hidden?: boolean;
    requiredModules?: string[];
    vars?: object[];
    voiceCommands?: string[];
};

/**
 * @callback mainFunction
 * @see registerPlugin
 * @param {object} [_] - This parameter is deprecated and should not be used anymore.
 * @param {object} config - Configuration of the plugin that the user set from within the web interface
 * (given you have added anything to the vars field of your script manifest).
 * @param {Manifest} meta - Manifest as specified in registerPlugin.
 */
declare type mainFunction = (_?: any, config: any, meta: Manifest) => void;

/**
 * @description
 * This is the first and only top-level function that should be called in your script,
 * everything else will be done in the function that is passed to it.
 * @example
 * registerPlugin({
 *     name: 'Demo Script',
 *     version: '1.0',
 *     description: 'This example actually does nothing',
 *     author: 'Author <author[at]example.com>',
 *     vars: []
 * }, function(_, config, meta) {
 *     // your code goes here
 * });
 * @param {Manifest} manifest
 * The manifest determines which features are available to the script and
 * contains metadata and variables that will be shown in the web interface.
 * @param {mainFunction} mainFunction
 * If the script is activated this function is called when the scripts are loaded.
 * The function receives three parameters, the first one (`_`) is deprecated and should not be used anymore.
 */
declare function registerPlugin(manifest: Manifest, mainFunction: mainFunction): void;

/**
 * @typedef {object} BannerSettings
 * @since 0.14.2
 * @property {string} format - e.g. "png"
 * @property {number} width
 * @property {number} height
 * @property {BannerLayer[]} layers
 */
declare type BannerSettings = {
    format: string;
    width: number;
    height: number;
    layers: BannerLayer[];
};

/**
 * @todo TODO: Document Layer Parameters! => https://github.com/SinusBot/scripting-docs/issues/23
 * @typedef {object} BannerLayer
 * @since 0.14.2
 */
declare type BannerLayer = any;

/**
 * @module graphics
 * @since 0.14.2
 * @description
 * This module is protected. This means that you need to add `'graphics'` to `requiredModules` in your script's {@link Manifest} in {@link registerPlugin} in order to use it.
 *
 * The best example on how to use the graphics module is the [Avatar banner script](https://forum.sinusbot.com/resources/avatar-banner-for-and-with-sinusbot.326/) by [Filtik](https://forum.sinusbot.com/members/filtik.7044/#resources).
 */
declare module "graphics" {
    /**
     * @description Removes the banner.
     * @return {boolean} success
     */
    function removeBanner(): boolean;
    /**
     * @description Setbanner sets the avatar of the sinusbot client.
     * @example
     * graphics.setBanner('banner', {
     *     "format": "png",
     *     "width": 260,
     *     "height": 120,
     *     "layers": [
     *         // FIXME: add layers here
     *     ]
     * }, function() {
     *     engine.setAvatarFromBanner('banner.png');
     * });
     * @param {string} filename - filename without ending
     * @param {BannerSettings} bannerSettings
     * @param {function} callback
     * @return {boolean} success
     */
    function setBanner(filename: string, bannerSettings: BannerSettings, callback: (...params: any[]) => any): boolean;
}

/**
 * @module helpers
 */
declare module "helpers" {
    /**
     * @description Returns a random numbers between zero and <max>
     * @param {number} max
     * @returns {number} Random number
     */
    function getRandom(max: number): number;
    /**
     * @description Returns a random permutation of numbers between zero and <max>
     * @param {number} max
     * @returns {number[]} A random permutation of numbers between zero and <max>
     */
    function getRandPerm(max: number): number[];
    /**
     * @description Creates an empty BytesWriter
     * @since 1.0.0
     * @returns {BytesWriter}
     */
    function newBytes(): BytesWriter;
    /**
     * @description Returns a BytesWriter for a given string
     * @since 1.0.0
     * @param {string} value String
     * @returns {BytesWriter}
     */
    function bytesFromString(value: string): BytesWriter;
    /**
     * @description Returns a BytesWriter for a given hex-string
     * @since 1.0.0
     * @param {string} value Hex-string
     * @returns {BytesWriter}
     */
    function bytesFromHex(value: string): BytesWriter;
    /**
     * @description Returns a BytesWriter for a given base64-string
     * @since 1.0.0
     * @param {string} value Base64-string
     * @returns {BytesWriter}
     */
    function bytesFromBase64(value: string): BytesWriter;
    /**
     * @description Encodes a string to base64
     * @param {string} input
     * @returns {string}
     */
    function base64Encode(input: string): string;
    /**
     * @description Decodes a string from base64
     * @param {string} input
     * @returns {string}
     */
    function base64Decode(input: string): string;
    /**
     * @description Encodes a string to hex
     * @param {string} input
     * @returns {string}
     */
    function hexEncode(input: string): string;
    /**
     * @description Decodes a string from hex
     * @param {string} input
     * @returns {string}
     */
    function hexDecode(input: string): string;
    /**
     * @description Generate a hex-encoded MD5 checksum of the given input
     * @param {string} input
     * @returns {string}
     */
    function MD5Sum(input: string): string;
    /**
     * @description Generate a hex-encoded SHA1 checksum of the given input
     * @param {string} input
     * @returns {string}
     */
    function SHA1Sum(input: string): string;
    /**
     * @description Generate a hex-encoded SHA256 checksum of the given input
     * @param {string} input
     * @returns {string}
     */
    function SHA256Sum(input: string): string;
    /**
     * @description Gets the string representation of an object
     * @deprecated This function should not be used anymore, if possible.
     * @param input
     * @returns {string}
     */
    function toString(input: any): string;
    /**
     * @description Returns the documentation of an interface
     * @param {string} name Interface name
     * @param {*} obj Interface to document
     * @returns {string} JSDoc String
     */
    function document(name: string, obj: any): string;
}

/**
 * @callback simpleRequestCallback
 * @see module:http#simpleRequest
 * @since 0.14.2
 * @param {string} [error]
 * @param {object} [response]
 * @param {Bytes} response.data - Data; Needs to be converted to a string first, e.g. `response.data.toString()`.
 * @param {object} response.headers - Headers
 * @param {string} response.status - Status
 * @param {number} response.statusCode - Status Code
 */
declare type simpleRequestCallback = (error?: string, response?: {
    data: Bytes;
    headers: any;
    status: string;
    statusCode: number;
}) => void;

/**
 * @module http
 * @description
 * This module is protected. This means that you need to add `'http'` to `requiredModules` in your script's {@link Manifest} in {@link registerPlugin} in order to use it - like shown here:
 *
 * ```javascript
 * registerPlugin({
 *     name: 'Demo http basic Script',
 *     version: '1.0.0',
 *     description: 'This example script sends a http request.',
 *     author: 'Author <author@example.com>',
 *     //...
 *     // define the protected modules that you require:
 *     requiredModules: ['http'],
 *     //...
 *     vars: []
 * }, (_, config, meta) => {
 *     const engine = require('engine');
 *     // and then you can require and use the module in here:
 *     const http = require('http');
 *
 *     // send request
 *     http.simpleRequest({
 *         'method': 'GET',
 *         'url': 'https://example.com',
 *         'timeout': 6000,
 *     }, function (error, response) {
 *         if (error) {
 *             engine.log("Error: " + error);
 *             return;
 *         }
 *
 *         if (response.statusCode != 200) {
 *             engine.log("HTTP Error: " + response.status);
 *             return;
 *         }
 *
 *         // success!
 *         engine.log("Response: " + response.data.toString());
 *     });
 * });
 * ```
 *
 * Examples can be found under [simpleRequest](#httpsimplerequest).
 */
declare module "http" {
    /**
     * @since 0.14.2
     * @description Creates an http request
     * @param {object} config - http configuration object
     * @param {string} [config.method] - Request Method to use (eg GET, POST, PUT, ...)
     * @param {string} config.url - The URL endpoint which should be called
     * @param {number} [config.timeout] - timeout in milliseconds
     * @param {string} [config.body] - request body
     * @param {object} [config.headers] - request header
     * @param {simpleRequestCallback} callback - Callback function with error and response
     * @example
     * registerPlugin({
     *     name: 'Demo http basic Script',
     *     version: '1.0.0',
     *     description: 'This example script sends a http request.',
     *     author: 'Author <author@example.com>',
     *     requiredModules: ['http'], // <-- don't forget this!
     *     vars: []
     * }, (_, config, meta) => {
     *     // import modules
     *     const engine = require('engine');
     *     const http = require('http');
     *
     *     // send request
     *     http.simpleRequest({
     *         'method': 'GET',
     *         'url': 'https://example.com',
     *         'timeout': 6000,
     *     }, function (error, response) {
     *         if (error) {
     *             engine.log("Error: " + error);
     *             return;
     *         }
     *
     *         if (response.statusCode != 200) {
     *             engine.log("HTTP Error: " + response.status);
     *             return;
     *         }
     *
     *         // success!
     *         engine.log("Response: " + response.data.toString());
     *     });
     * });
     *
     * @example
     * registerPlugin({
     *     name: 'Demo http basic Script',
     *     version: '1.0.0',
     *     description: 'This example script sends a http request and sends+receives json data.',
     *     author: 'Author <author@example.com>',
     *     requiredModules: ['http'], // <-- don't forget this!
     *     vars: []
     * }, (_, config, meta) => {
     *     // import modules
     *     const engine = require('engine');
     *     const http = require('http');
     *
     *     // define data that should be sent
     *     var sendData = JSON.stringify({ foo: 'bar' });
     *
     *     // send request
     *     http.simpleRequest({
     *         'method': 'POST',
     *         'url': 'https://example.com',
     *         'timeout': 6000,
     *         'body': sendData,
     *         'headers': {
     *             'Content-Type': 'application/json',
     *             'Content-Length': sendData.length
     *         }
     *     }, function (error, response) {
     *         if (error) {
     *             engine.log("Error: " + error);
     *             return;
     *         }
     *
     *         if (response.statusCode != 200) {
     *             engine.log("HTTP Error: " + response.status);
     *             return;
     *         }
     *
     *         // parse JSON response
     *         var res;
     *         try {
     *             res = JSON.parse(response.data.toString());
     *         } catch (err) {
     *             engine.log(err.message);
     *         }
     *
     *         // check if parsing was successfull
     *         if (res === undefined) {
     *             engine.log("Invalid JSON.");
     *             return;
     *         }
     *
     *         // success!
     *         engine.log(res);
     * });
     */
    function simpleRequest(config: {
        method?: string;
        url: string;
        timeout?: number;
        body?: string;
        headers?: any;
    }, callback: simpleRequestCallback): void;
}

/**
 * @module media
 */
declare module "media" {
    /**
     * @description Streams a URL or plays a track via internal url
     * @param {string} url - URL or Internal Track-URL (see {@link Track#url}, something like track://...)
     * @returns {boolean} success
     */
    function playURL(url: string): boolean;
    /**
     * Returns the current track
     * @returns {Track}
     */
    function getCurrentTrack(): Track;
    /**
     * Returns the track with the given ID (or null if none was found)
     * @param {string} id - Track ID
     * @returns {?Track}
     */
    function getTrackByID(id: string): Track;
    /**
     * Returns all Tracks
     * @since 1.0.0-beta.3
     * @returns {Track[]}
     */
    function getTracks(): Track[];
    /**
     * @description Searches for tracks matching the search term, returns 20 entries at most
     * @param {string} searchString
     * @returns {Track[]}
     * @example
     * var event = require('event');
     * var media = require('media');
     *
     * event.on('chat', function(ev) {
     *     var params = ev.text.split(' ');
     *     if (params.length == 1) {
     *         ev.client.chat('Please enter a searchterm after .play - like .play november rain');
     *         return;
     *     }
     *     if (params[0] == '.play') {
     *         params.shift();
     *         var results = media.search(params.join(' '));
     *         if (results.length > 0) {
     *             results[0].play();
     *             ev.client.chat('Playing - just for you: ' + results[0].artist() + ' - ' + results[0].title());
     *         } else {
     *             ev.client.chat('Sorry, I could not find anything that matched your search.');
     *         }
     *     }
     * });
     */
    function search(searchString: string): Track[];
    /**
     * @description Adds the given url to the queue
     * @param {string} url Track-URL (see {@link Track#url})
     * @returns {boolean} success
     */
    function enqueue(url: string): boolean;
    /**
     * @description Adds the given url as the first entry in the queue
     * @param {string} url Track-URL (see {@link Track#url})
     * @returns {boolean} success
     * @since 0.12.0
     */
    function playAsNext(url: string): boolean;
    /**
     * @description Plays the next track of the queue / playlist
     * @returns {boolean} success
     */
    function playNext(): boolean;
    /**
     * @description Plays the next previous of the queue / playlist
     * @returns {boolean} success
     */
    function playPrevious(): boolean;
    /**
     * @description Stops playback completely
     * @param {string} [trackID] - (optional) the track to stop; if not present, all tracks will be stopped
     * @returns {boolean} success
     */
    function stop(trackID?: string): boolean;
    /**
     * Returns all tracks of the queue
     * @returns {Track[]}
     */
    function getQueue(): Track[];
    /**
     * Returns all playlists
     * @returns {Playlist[]}
     */
    function getPlaylists(): Playlist[];
    /**
     * Returns the playlists with the given id
     * @returns {Playlist}
     */
    function getPlaylistByID(): Playlist;
    /**
     * Returns the currently active playlist
     * @returns {Playlist}
     */
    function getActivePlaylist(): Playlist;
    /**
     * @description Removes the track at a given position from the queue
     * @param {number} index - Index of the track that should be removed from the queue (0 being the first entry)
     * @returns {boolean} success
     */
    function removeFromQueue(index: number): boolean;
    /**
     * @description Removes all entries from the queue
     * @returns {boolean} success
     */
    function clearQueue(): boolean;
    /**
     * @description Clears the current playlist (if set) so that playback won't continue inside that playlist
     * @returns {boolean} success
     */
    function clearPlaylist(): boolean;
    /**
     * @description Plays a file via youtube-dl.
     * @param {string} url - URL that youtube-dl supports
     * @returns {string} Track-ID (last part of Track-URL: track://<uid>)
     */
    function yt(url: string): string;
    /**
     * @description Streams something via youtube-dl.
     * @param {string} url - URL that youtube-dl supports
     * @returns {boolean} success
     */
    function ytStream(url: string): boolean;
    /**
     * @description Downloads a file via youtube-dl, optionally plays it
     * @param {string} url - URL that youtube-dl supports
     * @param {boolean} play - Set to true to play after download
     * @returns {string} Track-ID
     */
    function ytdl(url: string, play: boolean): string;
    /**
     * @description Enqueues a stream via youtube-dl
     * @param {string} url - URL that youtube-dl supports
     * @returns {string} Track-ID
     */
    function enqueueYt(url: string): string;
    /**
     * @description Downloads a file via youtube-dl, then enqueues it
     * @param {string} url - Url that youtube-dl supports
     * @returns {string} Track-ID
     */
    function enqueueYtdl(url: string): string;
    /**
     * @description Plays the next track of the queue; resumes queue if stopped.
     * @since 1.0.0-beta.6
     */
    function playQueueNext(): void;
    /**
     * @description Alias for `playQueueNext()`. Plays the next track of the queue; resumes queue if stopped.
     * @since 1.0.0-beta.6
     */
    function resumeQueue(): void;
    /**
     * @description Clears the idle track.
     * @since 1.0.0-beta.6
     */
    function clearIdleTrack(): void;
    /**
     * @description Clears the startup track.
     * @since 1.0.0-beta.6
     */
    function clearStartupTrack(): void;
    /**
     * @description Sets the idle track.
     * @param {string} url Track-URL (see {@link Track#url})
     * @since 1.0.0-beta.6
     */
    function setIdleTrackURL(url: string): void;
    /**
     * @description Sets the startup track.
     * @param {string} url Track-URL (see {@link Track#url})
     * @since 1.0.0-beta.6
     */
    function setStartupTrackURL(url: string): void;
    /**
     * @description Starts playback of a playlist with a given track index.
     * @param {Playlist} playlist Playlist
     * @param {number} index Index of the track (e.g. `0` for first one)
     * @since 1.0.0-beta.8
     */
    function playlistPlayByID(playlist: Playlist, index: number): void;
}

declare namespace NetClient { }

/**
 * @interface NetClient
 * @since 0.9.16
 */
declare interface NetClient {
    /**
     * @description Sends data over the connection
     * @param {(string|Bytes|number[])} bytes - Data that should be sent over the socket; one can also send an array of ints / bytes like [0, 255, 1, 1]
     * @param {string} [format] - Optional, if given bytes will be decoded prior to sending; Can be either "hex" or "base64".
     */
    write(bytes: string | Bytes | number[], format?: string): void;
    /**
     * @description Registers a new event handler
     * @param {string} event - Name of the event to listen to
     * @param {function} callback
     */
    on(event: string, callback: (...params: any[]) => any): void;
    /**
     * @description Closes the current connection
     */
    close(): void;
}

/**
 * @typedef {object} NetConnectParams
 * @since 0.9.16
 * @property {string} [host] - Host to connect to; required for mysql / postgres
 * @property {number} [port] - Port to use
 * @property {string} [url] - WebSocket URL to use
 * @property {string} [protocol="tcp"] - can be udp, tcp or ws (websocket)
 */
declare type NetConnectParams = {
    host?: string;
    port?: number;
    url?: string;
    protocol?: string;
};

/**
 * @callback netConnectCallback
 * @see module:net#connect
 * @since 0.9.16
 * @description If an error occured, exactly one parameter containing the error will be handed to the callback.
 * @param {string} [error]
 */
declare type netConnectCallback = (error?: string) => void;

/**
 * @module net
 * @since 0.9.16
 * @description
 * This module is protected. This means that you need to add `'net'` to `requiredModules` in your script's {@link Manifest} in {@link registerPlugin} in order to use it.
 *
 * The net module allows you to connect to any TCP/UDP port or ws (websocket) and send raw data.
 * If you just need to send a http request then you should definitely use the [http module](#http) instead.
 * @example
 * const engine = require('engine');
 * const net = require('net');
 *
 * // connect to a tcp port
 * const conn = net.connect({
 *     host: '127.0.0.1',
 *     port: 80
 * }, err => {
 *     // log connection errors if any
 *     if (err) {
 *         engine.log(err);
 *     }
 * });
 *
 * // start listening for data
 * conn.on('data', data => {
 *     engine.log('received data');
 *     engine.log(data.toString());
 * })
 *
 * // write data if connection is available
 * if (conn) {
 *     // write data
 *     conn.write("GET / HTTP/1.1\r\nHost: localhost\r\n\r\n");
 * } else {
 *     engine.log('connection unavailable');
 * }
 */
declare module "net" {
    /**
     * @param {NetConnectParams} params - Connection parameters
     * @param {netConnectCallback} callback - Callback gets called on success/error.
     * @returns {?NetClient} Client connection, or null if failed to setup a connection
     * (e.g. wrong parameters; null does not mean that the connection failed, instead that it is handled in the callback)
     */
    function connect(params: NetConnectParams, callback: netConnectCallback): NetClient;
}

/**
 * @module store
 * @example
 * var store = require('store');
 * store.set('foo', 'bar');
 */
declare module "store" {
    /**
     * Stores a variable under the given key
     * the values stored are only available for the current script, but shared between instances of it
     * @param {string} key
     * @param {any} value - Value to be stored; must be JSON.stringify()-able
     * @returns {boolean}
     * @example
     * var store = require('store');
     * store.set('foo', 'bar');
     */
    function set(key: string, value: any): boolean;
    /**
     * Gets a variable that has been stored previously by set()
     * the values stored are only available for the current script, but shared between instances of it
     * @param {string} key
     * @returns {any} Stored value - or undefined, if not found
     * @example
     * var store = require('store');
     * var foo = store.get('foo');
     */
    function get(key: string): any;
    /**
     * Deletes a stored variable by its key
     * the values stored are only available for the current script, but shared between instances of it
     * @param {string} key
     */
    function unset(key: string): void;
    /**
     * Returns an array of all set keys
     * the values stored are only available for the current script, but shared between instances of it
     * @returns {string[]} Array of all stored keys
     */
    function getKeys(): string[];
    /**
     * Returns all stored items
     * the values stored are only available for the current script, but shared between instances of it
     * @returns {object} Keys of this object are the keys of each entry
     */
    function getAll(): any;
    /**
     * Stores a variable under the given key
     * the values stored are available for every script of every instance
     * @param {string} key
     * @param {any} value - Value to be stored; must be JSON.stringify()-able
     * @returns {boolean}
     */
    function setGlobal(key: string, value: any): boolean;
    /**
     * Gets a variable that has been stored previously by set()
     * the values stored are available for every script of every instance
     * @param {string} key
     * @returns {any} Stored value - or undefined, if not found
     */
    function getGlobal(key: string): any;
    /**
     * Deletes a stored variable by its key
     * the values stored are available for every script of every instance
     * @param {string} key
     */
    function unsetGlobal(key: string): void;
    /**
     * Returns an array of all set keys
     * the values stored are available for every script of every instance
     * @returns {string[]} Array of all stored keys
     */
    function getKeysGlobal(): string[];
    /**
     * Returns all stored items
     * the values stored are available for every script of every instance
     * @returns {object} Keys of this object are the keys of each entry
     */
    function getAllGlobal(): any;
    /**
     * Stores a variable under the given key
     * the values stored are available only for the current instance of the script (not shared between instances and / or other scripts)
     * @param {string} key
     * @param {any} value - Value to be stored; must be JSON.stringify()-able
     * @returns {boolean}
     */
    function setInstance(key: string, value: any): boolean;
    /**
     * Gets a variable that has been stored previously by set()
     * the values stored are available only for the current instance of the script (not shared between instances and / or other scripts)
     * @param {string} key
     * @returns {any} Stored value - or undefined, if not found
     */
    function getInstance(key: string): any;
    /**
     * Deletes a stored variable by its key
     * the values stored are available only for the current instance of the script (not shared between instances and / or other scripts)
     * @param {string} key
     */
    function unsetInstance(key: string): void;
    /**
     * Returns an array of all set keys
     * the values stored are available only for the current instance of the script (not shared between instances and / or other scripts)
     * @returns {string[]} Array of all stored keys
     */
    function getKeysInstance(): string[];
    /**
     * Returns all stored items
     * the values stored are available only for the current instance of the script (not shared between instances and / or other scripts)
     * @returns {object} Keys of this object are the keys of each entry
     */
    function getAllInstance(): any;
}

/**
 * @module ws
 * @since 0.9.20
 * @fires event#event:ws.connect
 * @fires event#event:ws.close
 * @fires event#event:ws.error
 * @fires event#event:ws.data
 * @description
 * This module is protected. This means that you need to add `'ws'` to `requiredModules` in your script's {@link Manifest} in {@link registerPlugin} in order to use it.
 *
 * The ws module allows you to start a websocket server.
 * If you want to connect to a websocket server instead then take look at the [net module](#net).
 * @example
 * // ### SinusBot script: ###
 *
 * const engine = require('engine');
 * const event = require('event');
 * const ws = require('ws');
 *
 * // listen for connections
 * event.on('ws.connect', id => {
 *     engine.log('new websocket connection; id ' + id);
 *     // broadcast data to all connected clients
 *     ws.broadcast(1, { blubb: 'blubb' });
 * });
 * // listen for disconnections
 * event.on('ws.disconnect', id => {
 *     engine.log('websocket connection disconnected; id ' + id);
 * });
 * // listen for data
 * event.on('ws.data', (id, type, data) => {
 *     engine.log('ws.data: id ' + id + '; data: ' + data.toString());
 *     // respond with data
 *     ws.write(id, type, data.toString());
 * });
 * @example
 * // ### Client Side (served html files via the enableWeb script option): ###
 *
 * var proto = (window.location.protocol == 'https:') ? 'wss' : 'ws';
 * var conn = new WebSocket(proto + "://" + document.location.host + "/api/v1/b/" + botId + "/i/" + instanceId + "/ws");
 * conn.onclose = function (evt) {
 * console.log('close', evt);
 *     alert('Closed.');
 * };
 * conn.send(JSON.stringify({ type: 'ping' }));
 * conn.onmessage = function (evt) {
 *     var data = JSON.parse(evt.data);
 * };
 */
declare module "ws" {
    /**
     * @description Writes some data to the connection with given connectionId
     * @param {string} connectionId
     * @param {number} messageType
     * @param {(string|Bytes)} message - Actual message; can be given as string or byteshelper
     */
    function write(connectionId: string, messageType: number, message: string | Bytes): void;
    /**
     * @description Broadcasts some data to all connected clients
     * @param {number} messageType
     * @param {(string|Bytes)} message - Actual message; can be given as string or byteshelper
     */
    function broadcast(messageType: number, message: string | Bytes): void;
    /**
     * @description Closes the connection
     * @param {string} connectionId
     */
    function close(connectionId: string): void;
}

/**
 * @interface ApiEvent
 * @description This type is passed to a `(api|public):<eventName>`-event,
 * see [`api:<eventName>`](#eventeventapieventname) or [`public:<eventName>`](#eventeventpubliceventname) for more.
 */
declare interface ApiEvent {
    /**
     * @returns {string} Name of the event
     */
    name(): string;
    /**
     * @returns {object} Json body
     */
    data(): any;
    /**
     * @returns {?User} User that called the event (or null, if unset)
     */
    user(): User;
    /**
     * @returns {string} Remote address that triggered the call
     */
    remoteAddr(): string;
    /**
     * @since 0.14
     * @returns {object} Key/Value map of the query parameters in the url
     */
    queryParams(): any;
}

/**
 * @interface Bytes
 * @since 0.9.16
 * @todo //TODO: add explanations
 */
declare interface Bytes {
    /**
     * @returns {number[]} uint8 array
     */
    bytes(): number[];
    /**
     * @param {number} length
     * @returns {string}
     */
    string(length: number): string;
    /**
     * @returns {string}
     */
    cString(): string;
    /**
     * @returns {number} int16
     */
    int16be(): number;
    /**
     * @returns {number} int16
     */
    int16le(): number;
    /**
     * @returns {number} int32
     */
    int32be(): number;
    /**
     * @returns {number} int32
     */
    int32le(): number;
    /**
     * @returns {number}
     */
    length(): number;
    /**
     * @returns {number}
     */
    pos(): number;
    /**
     * @param {number} pos
     * @returns {boolean}
     */
    seek(pos: number): boolean;
    /**
     * @returns {string}
     */
    toBase64(): string;
    /**
     * @returns {string}
     */
    toHex(): string;
    /**
     * @returns {string} String representation of the bytes
     */
    toString(): string;
    /**
     * @returns {number} uint8
     */
    uint8(): number;
    /**
     * @returns {number} uint16
     */
    uint16be(): number;
    /**
     * @returns {number} uint16
     */
    uint16le(): number;
    /**
     * @returns {number} uint32
     */
    uint32be(): number;
    /**
     * @returns {number} uint32
     */
    uint32le(): number;
}

/**
 * @interface BytesWriter
 * @since 0.9.16
 * @todo //TODO: add explanations
 */
declare interface BytesWriter {
    /**
     * @param {Bytes} bytes
     * @returns {number}
     */
    append(bytes: Bytes): number;
    /**
     * @returns {Bytes}
     */
    bytes(): Bytes;
    /**
     * @returns {number}
     */
    length(): number;
    /**
     * @returns {Bytes}
     */
    newReader(): Bytes;
    /**
     * @returns {string}
     */
    toBase64(): string;
    /**
     * @returns {string}
     */
    toHex(): string;
    /**
     * @returns {string} String representation of the bytes
     */
    toString(): string;
    /**
     * @param {string} str
     */
    writeString(str: string): void;
    /**
     * @param {string} str
     */
    writeCString(str: string): void;
    /**
     * @param {number} int8 Write 8-bit integer.
     */
    writeInt8(int8: number): void;
    /**
     * @param {number} int16 Write 16-bit integer as big-endian.
     */
    writeInt16be(int16: number): void;
    /**
     * @param {number} int16 Write 16-bit integer as little-endian.
     */
    writeInt16le(int16: number): void;
    /**
     * @param {number} int32 Write 32-bit integer as big-endian.
     */
    writeInt32be(int32: number): void;
    /**
     * @param {number} int32 Write 32-bit integer as little-endian.
     */
    writeInt32le(int32: number): void;
    /**
     * @param {number} int64 Write 64-bit integer as big-endian.
     */
    writeInt64be(int64: number): void;
    /**
     * @param {number} int64 Write 64-bit integer as little-endian.
     */
    writeInt64le(int64: number): void;
    /**
     * @param {number} uint8 Write unsigned 8-bit integer.
     */
    writeUint8(uint8: number): void;
    /**
     * @param {number} uint16 Write unsigned 16-bit integer as big-endian.
     */
    writeUint16be(uint16: number): void;
    /**
     * @param {number} uint16 Write unsigned 16-bit integer as little-endian.
     */
    writeUint16le(uint16: number): void;
    /**
     * @param {number} uint32 Write unsigned 32-bit integer as big-endian.
     */
    writeUint32be(uint32: number): void;
    /**
     * @param {number} uint32 Write unsigned 32-bit integer as little-endian.
     */
    writeUint32le(uint32: number): void;
    /**
     * @param {number} uint64 Write unsigned 64-bit integer as big-endian.
     */
    writeUint64be(uint64: number): void;
    /**
     * @param {number} uint64 Write unsigned 64-bit integer as little-endian.
     */
    writeUint64le(uint64: number): void;
}

/**
 * @interface Channel
 */
declare interface Channel {
    /**
     * @returns {string} ID
     */
    id(): string;
    /**
     * @returns {string} Name
     */
    name(): string;
    /**
     * @returns {?Channel} Parent of channel or null if none is set
     */
    parent(): Channel;
    /**
     * @since 0.9.16.3
     * @returns {number} Order / position of this channel.
     * For ts3 this is a numeric value determining the order in which channels are displayed below their parent. To set a new value, please use moveTo.
     */
    position(): number;
    /**
     * @param {number} pos
     */
    setPosition(pos: number): void;
    /**
     * @description delete the current channel
     * @since 0.9.17
     * @returns {boolean}
     */
    delete(): boolean;
    /**
     * @description Moves the channel to a new parent with a new position value
     * @since 0.9.16.3
     * @param {(string|Channel)} parent - New parent channel
     * @param {number} order - New order value
     */
    moveTo(parent: string | Channel, order: number): void;
    /**
     * @param {string} name
     * @since 0.9.16
     */
    setName(name: string): void;
    /**
     * @returns {number} Type (0 = voice, 1 = text)
     */
    type(): number;
    /**
     * @returns {string} Topic
     */
    topic(): string;
    /**
     * @param {string} topic
     * @since 0.9.16
     */
    setTopic(topic: string): void;
    /**
     * @since 0.9.19
     * @returns {string} Description
     */
    description(): string;
    /**
     * @param {string} description
     * @since 0.9.16
     */
    setDescription(description: string): void;
    /**
     * @returns {number} Codec
     */
    codec(): number;
    /**
     * @param {number} codec
     * @since 0.9.16
     */
    setCodec(codec: number): void;
    /**
     * @returns {number} Codec quality
     */
    codecQuality(): number;
    /**
     * @param {number} quality
     * @since 0.9.16
     */
    setCodecQuality(quality: number): void;
    /**
     * @returns {number} Configured number of clients the channel can hold (-1 if unlimited)
     */
    maxClients(): number;
    /**
     * @param {boolean} maxClients Set to -1 for unlimited clients
     * @since 0.9.16
     */
    setMaxClients(maxClients: boolean): void;
    /**
     * @returns {number}
     */
    maxFamilyClients(): number;
    /**
     * @param {boolean} maxFamilyClients
     * @since 0.9.16
     */
    setMaxFamilyClients(maxFamilyClients: boolean): void;
    /**
     * @returns {boolean} Whether channel is permanent or not
     */
    isPermanent(): boolean;
    /**
     * @param {boolean} permanent
     * @since 0.9.16
     */
    setPermanent(permanent: boolean): void;
    /**
     * @returns {boolean} Whether channel is semi-permanent or not
     */
    isSemiPermanent(): boolean;
    /**
     * @param {boolean} permanent
     * @since 0.9.16
     */
    setSemiPermanent(permanent: boolean): void;
    /**
     * @returns {boolean} Whether channel is the default one
     */
    isDefault(): boolean;
    /**
     * @param {boolean} bool Whether channel is the default one
     */
    setDefault(bool: boolean): void;
    /**
     * @returns {boolean} Whether channel is password-protected or not
     */
    isPassworded(): boolean;
    /**
     * @param {string} password Password
     */
    setPassword(password: string): void;
    /**
     * @returns {boolean} Whether channel is encrypted or not
     */
    isEncrypted(): boolean;
    /**
     * @param {boolean} encrypted
     * @since 0.9.16
     */
    setEncrypted(encrypted: boolean): void;
    /**
     * @description Compares two channels
     * @param {Channel} otherChannel
     * @returns {boolean} True, if both channels are the same
     */
    equals(otherChannel: Channel): boolean;
    /**
     * @description Sends a chat message to the channel
     * @param {string} msg - Message to send
     * @returns {boolean} success
     */
    chat(msg: string): boolean;
    /**
     * @returns {Client[]} Clients that are in this channel
     */
    getClients(): Client[];
    /**
     * @returns {number} Number of clients that are in the channel
     */
    getClientCount(): number;
    /**
     * @description enables / disables subscription for this channel; requires subscription mode
     * @param {boolean} val
     */
    subscribe(val: boolean): void;
    /**
     * @description Updates multiple channel parameters at once
     * @since 0.9.16.3
     * @param {ChannelParams} channelParams
     */
    update(channelParams: ChannelParams): void;
    /**
     * @description Assigns a client to a channel group
     * @since 0.9.18
     * @param {Client} client
     * @param {ChannelGroup} channelGroup
     */
    setChannelGroup(client: Client, channelGroup: ChannelGroup): void;
    /**
     * @description Gets the permissions for the channel from the server - this is an expensive call as the permissions are _not_ cached
     * @since 0.13.37
     * @returns {Permission[]}
     */
    getPermissions(): Permission[];
    /**
     * @description Adds/sets a new permission on the channel; you need to use the setters and then call save() to apply - can also be used to remove a permission by delete() afterwards
     * @since 0.13.37
     * @param {string} id - id of the permission to add; can also be supplied as name like i_channel_needed_join_power
     * @returns {Permission}
     */
    addPermission(id: string): Permission;
    /**
     * @returns {string}
     */
    getURL(): string;
    /**
     * Gets the messages of a discord channel.
     * @since 1.0.0-beta.2
     * @see https://discordapp.com/developers/docs/resources/channel#get-channel-messages
     * @param {object} params e.g. `{ around: 'messageid', limit: '1' }`, see [discord documentation](https://discordapp.com/developers/docs/resources/channel#get-channel-messages)
     * @param {function} callback (error, messages)
     * @returns {boolean}
     */
    getMessages(params: any, callback: (...params: any[]) => any): boolean;
}

/**
 * @interface ChannelGroup
 */
declare interface ChannelGroup {
    /**
     * @returns {string} ID of the channel group
     */
    id(): string;
    /**
     * @returns {string} Name of the channel group
     */
    name(): string;
    /**
     * @returns {string} ID of the icon used for the channel group
     * @since 0.12.0
     */
    icon(): string;
    /**
     * @description Gets the permissions for the channelgroup from the server - this is an expensive call as the permissions are _not_ cached
     * @since 0.13.37
     * @returns {Permission[]}
     */
    getPermissions(): Permission[];
    /**
     * @description Adds/sets a new permission to the channelgroup; you need to use the setters and then call save() to apply - can also be used to remove a permission by delete() afterwards
     * @since 0.13.37
     * @param {string} id - id of the permission to add; can also be supplied as name like i_channel_needed_join_power
     * @returns {Permission}
     */
    addPermission(id: string): Permission;
}

/**
 * @interface Client
 * @description Note: if the client is inivisible to the bot, some fields might not be available.
 */
declare interface Client {
    /**
     * @returns {string} Name/nickname of the client
     */
    name(): string;
    /**
     * Alias of name()
     * @returns {string} Name/nickname of the client
     */
    nick(): string;
    /**
     * @returns {string} Phonetic name of the client; useful for tts
     */
    phoneticName(): string;
    /**
     * @returns {string} Temporary ID of the client
     */
    id(): string;
    /**
     * @returns {string} Unique ID of the client
     */
    uid(): string;
    /**
     * Alias of uid()
     * @deprecated Please use uid() instead.
     * @returns {string} Unique ID of the client
     */
    uniqueId(): string;
    /**
     * @returns {string} TeamSpeak database ID of the client
     */
    databaseID(): string;
    /**
     * Alias of databaseID()
     * @returns {string} TeamSpeak database ID of the client
     */
    databaseId(): string;
    /**
     * @returns {string} Country of the client
     */
    country(): string;
    /**
     * @returns {string} Description of the client
     */
    description(): string;
    /**
     * @since 0.9.19
     * @param {string} description
     * @returns {boolean} success
     */
    setDescription(description: string): boolean;
    /**
     * Returns true when this client is the bot itself
     * @returns {boolean}
     */
    isSelf(): boolean;
    /**
     * Returns if the client is recording the conversation
     * @returns {string}
     */
    isRecording(): string;
    /**
     * Returns if the client is muted (has its microphone disabled)
     * @returns {boolean}
     */
    isMuted(): boolean;
    /**
     * Returns if the client is deaf (has its loudspeakers disabled)
     * @returns {boolean}
     */
    isDeaf(): boolean;
    /**
     * Returns if the client is away
     * @returns {boolean}
     */
    isAway(): boolean;
    /**
     * Returns the clients' servergroups
     * @returns {ServerGroup[]}
     */
    getServerGroups(): ServerGroup[];
    /**
     * Returns the clients' channelgroup
     * @returns {ChannelGroup}
     */
    getChannelGroup(): ChannelGroup;
    /**
     * Returns the clients' away message (if set)
     * @returns {string}
     */
    getAwayMessage(): string;
    /**
     * Returns the clients' last ping time (latency)
     * @returns {number}
     */
    getPing(): number;
    /**
     * Returns the clients' ip address (if available)
     * @returns {string}
     */
    getIPAddress(): string;
    /**
     * Returns the clients' online time (requires special permissions)
     * @returns {number} in milliseconds
     */
    getOnlineTime(): number;
    /**
     * Returns the clients' current idle time (requires special permissions)
     * @returns {number} in milliseconds
     */
    getIdleTime(): number;
    /**
     * Returns the clients' packet loss percentage (requires special permissions)
     * @returns {number}
     */
    getPacketLoss(): number;
    /**
     * Returns the clients' amount of received data (requires special permissions)
     * @returns {number}
     */
    getBytesReceived(): number;
    /**
     * Returns the clients' amount of sent data (requires special permissions)
     * @returns {number}
     */
    getBytesSent(): number;
    /**
     * Returns the total number of connections from that client
     * On TS3, this information has to be actively requested from the server. If the bot is unable to get it or hasn't received an answer in time, it will return <= 0 here.
     * @returns {number}
     */
    getTotalConnections(): number;
    /**
     * Returns the time the client has been created / was first seen by the server
     * On TS3, this information has to be actively requested from the server. If the bot is unable to get it or hasn't received an answer in time, it will return <= 0 here.
     * @returns {number}
     */
    getCreationTime(): number;
    /**
     * Returns an array of all channels the client is in; even if TS only uses one channel for a client at a time, other backends might provide several
     * @returns {Channel[]} Array of channels
     */
    getChannels(): Channel[];
    /**
     * @returns {Channel} Current audio channel the client is in
     */
    getAudioChannel(): Channel;
    /**
     * Returns the TS3 client URL in the format `client://0/uid~nickname`.
     * On discord it returns an @-mention in the format `<@uid>`.
     * @returns {string} Client URL / mention
     */
    getURL(): string;
    /**
     * @description Compares two clients
     * @param {Client} otherClient
     * @returns {boolean} true, if both clients are the same
     */
    equals(otherClient: Client): boolean;
    /**
     * @description Sends a message to the client
     * @param {string} msg - Message to send
     * @returns {boolean} success
     * @example
     * var backend = require('backend');
     * var client = backend.getClientByName('Bob');
     * client.chat('Hello, ' + client.name());
     */
    chat(msg: string): boolean;
    /**
     * @description Pokes the client with a message
     * @param {string} msg - Message to send
     * @example
     * var backend = require('backend');
     * var client = backend.getClientByName('Bob');
     * client.chat('Pokeypoke, ' + client.name() + '!');
     */
    poke(msg: string): void;
    /**
     * @description Bans a client
     * @param {number} time - Amount of time (in seconds) the ban should last (-1 for permanent)
     * @param {string} msg - Message to send
     * @example
     * var backend = require('backend');
     * var client = backend.getClientByName('Bob');
     * client.ban(100, 'See you in 100 seconds, ' + client.name() + '!');
     */
    ban(time: number, msg: string): void;
    /**
     * @description Kicks the client from the server
     * @param {string} msg - Message to send
     */
    kick(msg: string): void;
    /**
     * @description Kicks the client from the server
     * @param {string} msg - Message to send
     */
    kickFromServer(msg: string): void;
    /**
     * @description Kicks the client from the channel
     * @param {string} msg - Message to send
     */
    kickFromChannel(msg: string): void;
    /**
     * @description Adds a client to a specific ServerGroup
     * @param {(ServerGroup|string|number)} group - Servergroup the client should be added to
     */
    addToServerGroup(group: ServerGroup | string | number): void;
    /**
     * @description Removes a client from a specific ServerGroup
     * @param {(ServerGroup|string|number)} group - Servergroup the client should be removed from
     */
    removeFromServerGroup(group: ServerGroup | string | number): void;
    /**
     * @description
     * Moves a client to another channel
     *
     * *Note: This can also be used to disconnect a discord bot-instance from the voice chat with `backend.getBotClient().moveTo('')`.
     * @param {(Channel|string)} target - Channel the client should be moved to
     * @param {string} [password] - Password for the target channel, if required
     */
    moveTo(target: Channel | string, password?: string): void;
    /**
     * @description Enables / disables subscription for this client; requires subscription mode
     * @param {boolean} val
     */
    subscribe(val: boolean): void;
    /**
     * @description Returns the platform of the client (Windows, Linux, MacOS)
     * @returns {string} platform
     */
    getPlatform(): string;
    /**
     * @description Returns the version of the client
     * @returns {string} version
     */
    getVersion(): string;
    /**
     * @description Returns the client type (Query=0; Normal=1)
     * @returns {string} client type
     */
    type(): string;
}

/**
 * @interface DiscordMessage
 * @description Parameter of the message event callback.
 */
declare interface DiscordMessage {
    /**
     * @returns {Client} Client that sent the message.
     */
    author(): Client;
    /**
     * @returns {string} ID of the client that sent the message.
     */
    authorID(): string;
    /**
     * @returns {Channel} Channel in which the message was posted.
     */
    channel(): Channel;
    /**
     * @returns {string} ID of the channel in which the message was posted.
     */
    channelID(): string;
    /**
     * @returns {string} Content/Text of the message.
     */
    content(): string;
    /**
     * Create a reaction for the message.
     * `emoji` takes the form of `name:id` for custom guild emoji, or Unicode characters.
     *
     * Requires the `READ_MESSAGE_HISTORY` permission.
     * Additionally, if nobody else has reacted to the message using this emoji,
     * this requires the `ADD_REACTIONS` permission to be present on the current user.
     * @see https://discordapp.com/developers/docs/resources/channel#create-reaction
     * @param {string} emoji - Emoji in the form of `name:id` for custom guild emoji, or Unicode character.
     * @param {function} [callback]
     * @returns {boolean} success
     */
    createReaction(emoji: string, callback?: (...params: any[]) => any): boolean;
    /**
     * Deletes the message.
     * @param {function} [callback]
     * @returns {boolean} success
     */
    delete(callback?: (...params: any[]) => any): boolean;
    /**
     * Deletes all reactions on a message. This requires the `MANAGE_MESSAGES` permission.
     * @see https://discordapp.com/developers/docs/resources/channel#delete-all-reactions
     * @param {function} [callback]
     * @returns {boolean} success
     */
    deleteAllReactions(callback?: (...params: any[]) => any): boolean;
    /**
     * Delete a reaction the bot has made for the message.
     * @param {string} emoji - Emoji in the form of `name:id` for custom guild emoji, or Unicode character.
     * @param {function} [callback]
     * @returns {boolean} success
     */
    deleteOwnReaction(emoji: string, callback?: (...params: any[]) => any): boolean;
    /**
     * Delete a reaction that a given user has made for the message.
     * @since 1.0.0-beta.2
     * @param {string} emoji - Emoji in the form of `name:id` for custom guild emoji, or Unicode character.
     * @param {(Client|string)} user
     * @param {function} [callback]
     * @returns {boolean} success
     */
    deleteUserReaction(emoji: string, user: Client | string, callback?: (...params: any[]) => any): boolean;
    /**
     * Edits the content/text of the message.
     * @param {string} content
     * @param {function} [callback]
     * @returns {boolean} success
     */
    editContent(content: string, callback?: (...params: any[]) => any): boolean;
    /**
     * @returns {string} ID of the guild the message was sent in.
     */
    guildID(): string;
    /**
     * @returns {string} ID of the Message.
     */
    ID(): string;
    /**
     * @returns {boolean} Whether this was a TTS message.
     */
    isTTS(): boolean;
    /**
     * Posts a message in the same channel/chat that the original message was sent in.
     * @param {string} text
     * @param {function} [callback]
     * @returns {boolean} success
     */
    reply(text: string, callback?: (...params: any[]) => any): boolean;
    /**
     * @returns {Date} Timestamp when this message was sent.
     */
    timestamp(): Date;
    /**
     * @returns {Date} Timestamp when this message was edited (same as timestamp() if never).
     */
    timestampEdited(): Date;
}

/**
 * @interface ExtendedDiscord
 * @since 1.0.0-alpha.6
 * @todo //TODO: fix return types and callbacks
 */
declare interface ExtendedDiscord {
    /**
     * Retrieves info about the specific Guild
     * @since 1.0.0-alpha.6
     * @param {string} guildId the guild id of which the info should be retrieved
     * @param {function} callback => (err, object)
     */
    getGuild(guildId: string, callback: (...params: any[]) => any): void;
    /**
     * Modifys the guild
     * @since 1.0.0-alpha.6
     * @param {string} guildId Guild ID
     * @param {object} guildObject [Guild Object](https://discordapp.com/developers/docs/resources/guild#guild-object) with the data that should be modified
     * @param {function} [callback] => (err, object)
     */
    modifyGuild(guildId: string, guildObject: any, callback?: (...params: any[]) => any): void;
    /**
     * Sends a presence or status update.
     * @see https://discordapp.com/developers/docs/topics/gateway#update-status
     * @since 1.0.0-alpha.6
     * @example
     * const backend = require("backend")
     * // => playing hide and seek
     * backend.extended().setStatus({
     *     since: 0,
     *     game: {
     *         name: "hide and seek",
     *         type: 0,
     *     },
     *     status: "online",
     *     afk: false
     * })
     * @example
     * const backend = require("backend")
     * // => set status to 'do not disturb'
     * backend.extended().setStatus({
     *     since: 0,
     *     game: {},
     *     status: "dnd",
     *     afk: false
     * })
     * @param {object} status
     * @param {object} [status.game] Activity
     * @param {string} [status.game.name] Activity's name
     * @param {number} [status.game.type] Activity's type: 0 (game), 1 (streaming), 2 (listening)
     * @param {string} [status.game.url] Only https://twitch.tv/ urls work.
     * @param {string} status.status [Status Type](https://discordapp.com/developers/docs/topics/gateway#update-status-status-types). Either online, dnd, idle, invisible or offline.
     * @param {boolean} status.afk Whether or not the client is afk.
     * @param {number}  [status.since] Unix time (in milliseconds) of when the client went idle, or null if the client is not idle.
     */
    setStatus(status: {
        game?: {
            name?: string;
            type?: number;
            url?: string;
        };
        status: string;
        afk: boolean;
        since?: number;
    }): void;
    /**
     * Get a channel by ID. Returns a channel object.
     * @see https://discordapp.com/developers/docs/resources/channel#get-channel
     * @since 1.0.0-alpha.6
     * @param {string} channelId
     * @param {function} callback => (err, [ChannelObject](https://discordapp.com/developers/docs/resources/channel#channel-object))
     */
    getChannel(channelId: string, callback: (...params: any[]) => any): void;
    /**
     * Update a channels settings. Requires the `MANAGE_CHANNELS` permission for the guild.
     * @see https://discordapp.com/developers/docs/resources/channel#modify-channel
     * @since 1.0.0-alpha.6
     * @param {string} channelId
     * @param {object} data [Channel Params](https://discordapp.com/developers/docs/resources/channel#modify-channel-json-params)
     * @param {function} [callback] => (err, object)
     */
    modifyChannel(channelId: string, data: any, callback?: (...params: any[]) => any): void;
    /**
     * Delete a channel, or close a private message.
     * Requires the `MANAGE_CHANNELS` permission for the guild.
     * Deleting a category does not delete its child channels;
     * they will have their parent_id removed and a Channel Update Gateway event will fire for each of them.
     * @see https://discordapp.com/developers/docs/resources/channel#deleteclose-channel
     * @since 1.0.0-alpha.6
     * @param {string} channelId
     * @param {function} [callback] => (err, object)
     */
    deleteChannel(channelId: string, callback?: (...params: any[]) => any): void;
    /**
     * Returns the messages for a channel.
     * If operating on a guild channel, this endpoint requires the `VIEW_CHANNEL` permission to be present on the current user.
     * If the current user is missing the `READ_MESSAGE_HISTORY` permission in the channel then this will return no messages (since they cannot read the message history).
     * @see https://discordapp.com/developers/docs/resources/channel#get-channel-messages
     * @since 1.0.0-alpha.6
     * @param {string} channelId
     * @param {function} callback => (err, object)
     */
    getChannelMessages(channelId: string, callback: (...params: any[]) => any): void;
    /**
     * Returns a specific message in the channel.
     * If operating on a guild channel, this endpoint requires the `READ_MESSAGE_HISTORY` permission to be present on the current user.
     * @see https://discordapp.com/developers/docs/resources/channel#get-channel-message
     * @since 1.0.0-alpha.6
     * @param {string} channelId
     * @param {function} callback => (err, object)
     */
    getChannelMessage(channelId: string, callback: (...params: any[]) => any): void;
    /**
     * Post a message to a guild text or DM channel.
     * If operating on a guild channel, this endpoint requires the SEND_MESSAGES permission to be present on the current user.
     * If the tts field is set to true, the `SEND_TTS_MESSAGES` permission is required for the message to be spoken.
     * @see https://discordapp.com/developers/docs/resources/channel#create-message
     * @since 1.0.0-alpha.6
     * @param {string} channelId
     * @param {object} data [Message Params](https://discordapp.com/developers/docs/resources/channel#create-message-params)
     * @param {function} [callback] => (err, object)
     */
    createMessage(channelId: string, data: any, callback?: (...params: any[]) => any): void;
    /**
     * Sends a raw http request to the discord API and therefore **allows potentially unsafe and arbitrary API calls**.
     * **Important:** This method is protected and only works if `requiredModules: ['discord-dangerous']` is set in the script manifest.
     * Check the [discord documentation](https://discordapp.com/developers/docs/resources/channel) for available API calls.
     * @since 1.0.0-alpha.6
     * @param {string} method HTTP Method
     * @param {string} path HTTP path
     * @param {object} data Data (JSON Object)
     * @param {function} [callback] => (err, object)
     */
    rawCommand(method: string, path: string, data: any, callback?: (...params: any[]) => any): void;
}

/**
 * @interface ExtendedTS3
 * @since 1.0.0-alpha.6
 */
declare interface ExtendedTS3 {
    /**
     * Retrieves TeamSpeak Server Info
     * @since 1.0.0-alpha.6
     * @returns {TeamSpeakServerInfo} TeamSpeakServerInfo Object for current server
     */
    getServerInfo(): TeamSpeakServerInfo;
    /**
     * Retrieve Extended TeamSpeak Server Info
     *
     * This will fire a [serverinfo_int](#eventeventserverinfo_int) event with a {@link TeamSpeakExtendedServerInfo} object as callback parameter.
     * @since 1.0.0-alpha.6
     * @fires event#serverinfo_int
     * @returns {boolean} success
     */
    requestExtendedServerInfo(): boolean;
}

/**
 * @interface Permission
 * @description handles channel, channelgroup and servergroup permissions; mainly for TS3
 * @since 0.13.37
 */
declare interface Permission {
    /**
     * @since 0.13.37
     * @returns {string} ID of the permission
     */
    id(): string;
    /**
     * @since 0.13.37
     * @returns {string} Name of the permission
     */
    name(): string;
    /**
     * @since 0.13.37
     * @returns {number} permission value
     */
    value(): number;
    /**
     * @since 0.13.37
     * @returns {boolean} true, if skip flag has been set - only applicable for ServerGroups
     */
    skip(): boolean;
    /**
     * @since 0.13.37
     * @returns {boolean} true, if negated flag has been set - only applicable for ServerGroups
     */
    negated(): boolean;
    /**
     * @description sets the value of the permission; you need to call save() to apply changes
     * @since 0.13.37
     * @param {boolean} value - true, if permission should be negated, false otherwise
     * @returns {boolean}
     */
    setNegated(value: boolean): boolean;
    /**
     * @description sets the skip flag - only applicable for ServerGroups; you need to call save() to apply changes
     * @since 0.13.37
     * @param {boolean} value - true, if permission should be skipped, false otherwise
     * @returns {boolean}
     */
    setSkip(value: boolean): boolean;
    /**
     * @description sets the negated flag - only applicable for ServerGroups; you need to call save() to apply changes
     * @since 0.13.37
     * @param {number} value - new value for the permission
     * @returns {boolean}
     */
    setValue(value: number): boolean;
    /**
     * @description applies the changed settings
     * @since 0.13.37
     * @returns {boolean}
     */
    save(): boolean;
    /**
     * @description delete the current permission
     * @since 0.13.37
     * @returns {boolean}
     */
    delete(): boolean;
}

/**
 * @interface Playlist
 */
declare interface Playlist {
    /**
     * @returns {string} Unique identifier of the playlist
     */
    id(): string;
    /**
     * @returns {string} Name of the playlist
     */
    name(): string;
    /**
     * @returns {PlaylistTrack[]} List of all tracks inside the given playlist
     */
    getTracks(): PlaylistTrack[];
    /**
     * @description Sets the playlist to active; will continue playing songs from this playlist
     * @returns {boolean}
     */
    setActive(): boolean;
}

/**
 * @interface PlaylistTrack
 * @description Track in a Playlist
 */
declare interface PlaylistTrack {
    /**
     * @returns {string} Title of the track
     */
    title(): string;
    /**
     * @returns {string} Artist of the track
     */
    artist(): string;
    /**
     * @returns {string} Album of the track
     */
    album(): string;
    /**
     * @returns {string} Url of the track (internal or external)
     */
    url(): string;
    /**
     * @description Starts playback of the track
     * @returns {boolean} success
     */
    play(): boolean;
}

/**
 * @interface ServerGroup
 */
declare interface ServerGroup {
    /**
     * @returns {string} ID of the server group
     */
    id(): string;
    /**
     * @returns {string} Name of the server group
     */
    name(): string;
    /**
     * @returns {string} ID of the icon used for the channel group
     * @since 0.12.0
     */
    icon(): string;
    /**
     * @description Adds a client by database ID to the servergroup
     * @returns {boolean} status if the request was successful
     * @since 0.13.37
     * @param {(Client|string|number)} client - The client can be a client object, string or number
     */
    addClientByDatabaseId(client: Client | string | number): boolean;
    /**
     * @description Removes a client by database ID from the servergroup
     * @returns {boolean} status if the request was successful
     * @since 0.13.37
     * @param {(Client|string|number)} client - The client can be a client object, string or number
     */
    removeClientByDatabaseId(client: Client | string | number): boolean;
    /**
     * @description Gets the permissions for the servergroup from the server - this is an expensive call as the permissions are _not_ cached
     * @since 0.13.37
     * @returns {Permission[]}
     */
    getPermissions(): Permission[];
    /**
     * @description Adds/sets a new permission to the servergroup; you need to use the setters and then call save() to apply - can also be used to remove a permission by delete() afterwards
     * @since 0.13.37
     * @param {string} id - id of the permission to add; can also be supplied as name like i_channel_needed_join_power
     * @returns {Permission}
     */
    addPermission(id: string): Permission;
}

/**
 * @interface TeamSpeakExtendedServerInfo
 * @since 1.0.0-alpha.6
 * @description
 * See [backend.extended().requestExtendedServerInfo()](#extendedts3requestextendedserverinfo).
 */
declare interface TeamSpeakExtendedServerInfo {
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} max clients which are allowed to connect to the server
     */
    maxClients(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} amount of clients which are connected to the server
     */
    clientsOnline(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} amount of created channels on the server
     */
    channelsOnline(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} server uptime in seconds
     */
    uptime(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} how many complains a client needs to have until he gets banned
     */
    complainAutobanCount(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} autoban duration
     */
    complainAutobanTime(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} seconds of when a complain gets removed
     */
    complainRemoveTime(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} number of clients need to be connected to a channel until all get silenced (enforces talkpower)
     */
    minClientsInChannelBeforeForcedSilence(): number;
    /**
     * Anti-Flood: Amount of reduced points per tick.
     * @since 1.0.0-alpha.6
     * @returns {number}
     */
    antifloodPointsTickReduce(): number;
    /**
     * Anti-Flood: Points needed for commands block.
     * @since 1.0.0-alpha.6
     * @returns {number}
     */
    antifloodPointsNeededCommandBlock(): number;
    /**
     * Anti-Flood: Points needed for IP block.
     * @since 1.0.0-alpha.6
     * @returns {number}
     */
    antifloodPointsNeededIPBlock(): number;
    /**
     * Amount of client connections.
     * @since 1.0.0-alpha.6
     * @returns {number}
     */
    clientConnections(): number;
    /**
     * Amount of query client connections.
     * @since 1.0.0-alpha.6
     * @returns {number}
     */
    queryClientConnections(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} amount of query clients connected to the server
     */
    queryClientsOnline(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} voiceservers port
     */
    port(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} wether the server is set to autostart or not
     */
    autostart(): number;
    /**
     * @since 1.0.0-alpha.6
     * @todo //TODO: evaluate what the machine id is
     * @returns {string}
     */
    machineID(): string;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} needed security level to connect to the server
     */
    neededIdentitySecurityLevel(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} wether logging for clients actions is enabled
     */
    logClient(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} wether logging for query actions is enabled
     */
    logQuery(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} wether logging for channel changes is enabled
     */
    logChannel(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} wether logging for permissions changes is enabled
     */
    logPermissions(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} wether logging for server actions is enabled
     */
    logServer(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} wether logging for filetransfer actions is enabled
     */
    logFiletransfer(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} minimum client version needed to connect
     */
    minClientVersion(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} max download bandwith which is allowed for filetransfer
     */
    maxDownloadTotalBandwidth(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} max upload bandwith which is allowed for filetransfer
     */
    maxUploadTotalBandwidth(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} maximum bytes which are able to be downloaded via filetransfer
     */
    downloadQuota(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} maximum bytes which are able to be uploaded via filetransfer
     */
    uploadQuota(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} amount of bytes which have been downloaded this month
     */
    monthBytesDownloaded(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} amount of bytes which have been uploaded this month
     */
    monthBytesUploaded(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} total amount of bytes which have been downloaded
     */
    totalBytesDownloaded(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} total amount of bytes which have been uploaded
     */
    totalBytesUploaded(): number;
    /**
     * Retrieve the raw object
     * @since 1.0.0-alpha.6
     * @returns {object} serverinfo as stringifyable object
     */
    asObject(): any;
}

/**
 * @interface TeamSpeakServerInfo
 * @since 1.0.0-alpha.6
 */
declare interface TeamSpeakServerInfo {
    /**
     * @since 1.0.0-alpha.6
     * @returns {string} server name
     */
    name(): string;
    /**
     * @since 1.0.0-alpha.6
     * @returns {string} server uid
     */
    uid(): string;
    /**
     * @since 1.0.0-alpha.6
     * @returns {string} welcome message
     */
    welcomeMessage(): string;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number}
     */
    platform(): number;
    /**
     * Note: Currently does not work; only returns `0`.
     * @since 1.0.0-alpha.6
     * @todo //FIXME: always returns 0 due to wrong type
     * @returns {number} version of the server
     */
    version(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {string} host message
     */
    hostMessage(): string;
    /**
     * @since 1.0.0-alpha.6
     * @returns {string} banner url
     */
    hostBannerURL(): string;
    /**
     * @since 1.0.0-alpha.6
     * @returns {string} gfx url of the banner
     */
    hostBannerGFXURL(): string;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} banner gfx interval in seconds
     */
    hostBannerGFXInterval(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {string} hostbutton url
     */
    hostButtonURL(): string;
    /**
     * @since 1.0.0-alpha.6
     * @returns {string} hostbutton gfx url
     */
    hostButtonGFXURL(): string;
    /**
     * @since 1.0.0-alpha.6
     * @returns {string} phoenetic server name
     */
    namePhonetic(): string;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} teamspeak server id
     */
    serverID(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} server icon id
     */
    iconID(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} amount of reserved slots
     */
    reservedSlots(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} id of the default server group
     */
    defaultServerGroup(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} id of the default channel group
     */
    defaultChannelGroup(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} id of the default channel admin group
     */
    defaultChannelAdminGroup(): number;
    /**
     * Retrieves the Encryption Mode of the server
     * @since 1.0.0-alpha.6
     * @returns {number} encryption mode (perChannel=0; GlobalOff=1; GlobalOn=2)
     */
    codecEncryptionMode(): number;
    /**
     * @since 1.0.0-alpha.6
     * @returns {number} server creation timestamp
     */
    created(): number;
    /**
     * Retrieve the raw object
     * @since 1.0.0-alpha.6
     * @returns {object} serverinfo as stringifyable object
     */
    asObject(): any;
}

/**
 * @interface Track
 */
declare interface Track {
    /**
     * @returns {string} Unique ID of the track
     */
    id(): string;
    /**
     * @returns {string} Unique url for the track
     */
    url(): string;
    /**
     * @returns {string} Type of the file
     */
    type(): string;
    /**
     * @returns {string} Title of the track
     */
    title(): string;
    /**
     * @returns {string} Artist of the track
     */
    artist(): string;
    /**
     * @returns {string} Temporary title of the track; e.g. when playing radio stations
     */
    tempTitle(): string;
    /**
     * @returns {string} Temporary artist of the track; e.g. when playing radio stations
     */
    tempArtist(): string;
    /**
     * @returns {string} Album of the track
     */
    album(): string;
    /**
     * @returns {string} Genre of the track
     * @since 0.9.16
     */
    genre(): string;
    /**
     * @returns {number} Duration of the track (in milliseconds)
     * @since 0.9.16
     */
    duration(): number;
    /**
     * @returns {number} Tracknumber of the track
     * @since 0.9.16
     */
    trackNumber(): number;
    /**
     * @returns {string} Path to the thumbnail, if any
     */
    thumbnail(): string;
    /**
     * @returns {string} Original filename
     */
    filename(): string;
    /**
     * @description Starts playback of the track
     * @returns {boolean} success
     */
    play(): boolean;
    /**
     * @description Adds the track to the queue
     * @returns {boolean} success
     */
    enqueue(): boolean;
    /**
     * @description Adds the track as the first entry in the queue
     * @returns {boolean} success
     */
    addNext(): boolean;
    /**
     * @description Downloads a thumbnail from the internet and stores it for the given track
     * @param {string} url - Url to download the thumbnail from (limited to X MB)
     */
    setThumbnailFromURL(url: string): void;
    /**
     * @description Removes the thumbnail of a track
     */
    removeThumbnail(): void;
    /**
     * @since 1.0.0-beta2
     * @returns {string}
     */
    sourceURL(): string;
}

/**
 * @interface User
 */
declare interface User {
    /**
     * @description Returns the ID of the user
     * @returns {string} ID of the User
     * @since 0.13.37
     */
    id(): string;
    /**
     * @description Returns the name of the user
     * @returns {string} Name of the User
     * @since 0.13.37
     */
    name(): string;
    /**
     * @example
     * let privileges = {
     *     LOGIN:           1 <<  0,
     *     LIST_FILE:       1 <<  1,
     *     UPLOAD_FILE:     1 <<  2,
     *     DELETE_FILE:     1 <<  3,
     *     EDIT_FILE:       1 <<  4,
     *     CREATE_PLAYLIST: 1 <<  5,
     *     DELETE_PLAYLIST: 1 <<  6,
     *     ADDTO_PLAYLIST:  1 <<  7,
     *     STARTSTOP:       1 <<  8,
     *     EDITUSERS:       1 <<  9,
     *     CHANGENICK:      1 << 10,
     *     BROADCAST:       1 << 11,
     *     PLAYBACK:        1 << 12,
     *     ENQUEUE:         1 << 13,
     *     ENQUEUENEXT:     1 << 14,
     *     EDITBOT:         1 << 15,
     *     EDITINSTANCE:    1 << 16,
     * }
     *
     * function hasPlaybackOrEnqueuePermission(user) {
     *     // returns true if user has playback or enqueue permission
     *     return (user.privileges() & (privileges.PLAYBACK | privileges.ENQUEUE)) != 0
     * }
     *
     * @description Returns the privileges of the user
     * @returns {number} Privileges of the user
     * @since 0.13.37
     */
    privileges(): number;
    /**
     * @description Returns the instance privileges of the user
     * @returns {number} Instance privileges of the user
     * @since 1.0.0-beta.9
     * @see privileges
     */
    instancePrivileges(): number;
    /**
     * @returns {string} teamspeak or discord unique ID if bound to a client
     * @since 0.13.37
     * @see uid
     */
    tsUid(): string;
    /**
     * @returns {string} teamspeak or discord unique ID if bound to a client
     * @since 1.0.0-alpha.6
     * @see tsUid
     */
    uid(): string;
    /**
     * @returns {string} Group ID if bound to a teamspeak group or discord role
     * @since 0.13.37
     * @see groupId
     */
    tsGroupId(): string;
    /**
     * @returns {string} Group ID if bound to a teamspeak group or discord role
     * @since 1.0.0-alpha.6
     * @see tsGroupId
     */
    groupId(): string;
    /**
     * @description Checks if an user is an admin
     * @returns {boolean} Admin status of the user
     * @since 0.13.37
     */
    isAdmin(): boolean;
    /**
     * @description Sets a new password to the user
     * @returns {boolean} Success or not
     * @param {string} password - new password of the user
     * @since 0.13.37
     */
    setPassword(password: string): boolean;
    /**
     * @description Sets the teamspeak/discord unique ID
     * @returns {boolean} Success or not
     * @param {string} uid - teamspeak/discord unique ID of the client
     * @since 0.13.37
     * @see setUid
     */
    setTSUid(uid: string): boolean;
    /**
     * @description Sets the teamspeak/discord unique ID
     * @returns {boolean} Success or not
     * @param {string} uid - teamspeak/discord unique ID of the client
     * @since 1.0.0-beta.9
     * @see setTSUid
     */
    setUid(uid: string): boolean;
    /**
     * @description Sets the group ID
     * @returns {boolean} Success or not
     * @param {string} groupId - teamspeak group ID or discord role ID
     * @since 1.0.0-alpha.6
     */
    setGroupId(groupId: string): boolean;
    /**
     * @description Sets the users privileges
     * @returns {boolean} Success or not
     * @param {number} privileges - New privileges of the user
     * @since 0.13.37
     */
    setPrivileges(privileges: number): boolean;
    /**
     * @description Adds a privilege to a user
     * @returns {boolean} Success or not
     * @param {number} privilege - New privilege which should be added
     * @since 0.13.37
     */
    addPrivilege(privilege: number): boolean;
    /**
     * @description Removes a privilege from a user
     * @returns {boolean} Success or not
     * @param {number} privilege - Privilege which should be removed
     * @since 0.13.37
     */
    removePrivilege(privilege: number): boolean;
    /**
     * @description Sets the users instance privileges
     * @returns {boolean} Success or not
     * @param {number} privileges - New privileges of the user
     * @since 1.0.0-beta.9
     */
    setInstancePrivileges(privileges: number): boolean;
    /**
     * @description Adds an instance privilege to a user
     * @returns {boolean} Success or not
     * @param {number} privilege - New privilege which should be added
     * @since 1.0.0-beta.9
     */
    addInstancePrivilege(privilege: number): boolean;
    /**
     * @description Removes an instance privilege from a user
     * @returns {boolean} Success or not
     * @param {number} privilege - Privilege which should be removed
     * @since 1.0.0-beta.9
     */
    removeInstancePrivilege(privilege: number): boolean;
    /**
     * @description Deletes an user
     * @returns {boolean} Success or not
     * @since 0.13.37
     */
    delete(): boolean;
}

/**
 * @interface CryptoKeypair
 * @since 1.0.0
 */
declare interface CryptoKeypair {
    /**
     * Returns Keypair bytes.
     * @returns {BytesWriter} Keypair bytes
     */
    export(): BytesWriter;
    /**
     * @todo TODO: add some explanations
     * @todo FIXME: What's this parameter for?
     * @param {BytesWriter} something
     * @returns {BytesWriter}
     */
    sharedKey(something: BytesWriter): BytesWriter;
}

/**
 * @typedef {object} ChannelParams
 * @property {string} name - Displayname of the channel; mandatory on create
 * @property {(Channel|number|string)} parent - Parent channel (you can also use the channelId); ignored on update, mandatory on create
 * @property {string} description
 * @property {string} topic
 * @property {string} password
 * @property {number} codec - See codec types for explanation
 * @property {number} codecQuality
 * @property {boolean} encrypted - `true` by default
 * @property {boolean} permanent
 * @property {boolean} semiPermanent
 * @property {number} position
 * @property {number} maxClients - Set to `-1` for unlimited clients
 * @property {number} maxFamilyClients
 * @property {boolean} default - Whether the channel is the default channel
 * @property {number} neededTalkPower - TS3 only
 * @property {number} deleteDelay - TS3 only
 * @property {number} icon - TS3 only
 * @description
 * Used to update or create a channel;
 * When creating a channel parent and name are mandatory for TS3;
 * When updating a channel parent will be ignored (use moveTo instead)
 */
declare type ChannelParams = {
    name: string;
    parent: Channel | number | string;
    description: string;
    topic: string;
    password: string;
    codec: number;
    codecQuality: number;
    encrypted: boolean;
    permanent: boolean;
    semiPermanent: boolean;
    position: number;
    maxClients: number;
    maxFamilyClients: number;
    default: boolean;
    neededTalkPower: number;
    deleteDelay: number;
    icon: number;
};

/**
 * @interface
 * @typedef {object} ClientServerGroupEvent
 * @property {Client} client - Client that has been added / removed
 * @property {Client} invoker - Client that added client to the group
 * @property {ServerGroup} serverGroup - Server Group
 */
declare type ClientServerGroupEvent = {
    client: Client;
    invoker: Client;
    serverGroup: ServerGroup;
};

/**
 * @interface
 * @typedef {object} Message
 * @property {string} text - Text of the message
 * @property {Channel} channel - Channel (if given) this message has been sent on
 * @property {Client} client - Client that sent the message
 * @property {number} mode - Number representing the way this message has been sent
 * (1 = private, 2 = channel, 3 = server)
 */
declare type Message = {
    text: string;
    channel: Channel;
    client: Client;
    mode: number;
};

/**
 * @interface
 * @typedef {object} MoveInfo
 * @property {Channel} [fromChannel] - Old channel (or null if the client just got online/changed visibility)
 * @property {Channel} [toChannel] - New channel (or null if the client just went offline/changed visibility)
 * @property {Client} client - Client that was moved
 * @property {Client} invoker - Client that invoked the move
 * @property {string} [message] - move/ban/kick message (TS3; since 1.0.0-beta.6)
 */
declare type MoveInfo = {
    fromChannel?: Channel;
    toChannel?: Channel;
    client: Client;
    invoker: Client;
    message?: string;
};


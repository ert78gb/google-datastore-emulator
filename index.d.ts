interface Options {
  /**
   * Default: empty
   *
   * This variable is datastore project Id. If it is empty, GCLOUD_PROJECT environment variable will be used. Either you should set it directly or the environment variable should be set.
   */
  project?: string;

  /**
   * Default: false
   *
   * The emulator creates a directory where the project files are stored. If it is empty the emulator default value will be used. You could set relative ./directory or absolute path /tmp/dir1/dir2/. If this directory does not exist, it will be created. **Bug:** With linux Docker host don't delete the folder
   */
  storeOnDisk?: boolean;

  /**
   * Default: empty
   *
   * The emulator creates a directory where the project files are stored. If it is empty the emulator default value will be used. You could set relative ./directory or absolute path /tmp/dir1/dir2/. If this directory does not exist, it will be created. Bug : With linux Docker host don't delete the folder
   */
  dataDir?: string;

  /**
   * Default: true
   *
   * If dataDir value is set and 'clean' value is true then the package deletes the dataDir. The package **does not** delete the gcloud emulator default directory.
   */
  clean?: boolean;

  /**
   * Default: localhost
   *
   * If it is empty the'localhost' of google default value is used. It can take the form of a single address (hostname, IPv4, or IPv6)
   */
  host?: string;

  /**
   * Default: 8081
   *
   * If it is empty the emulator selects a random free port. If use docker version always set port.
   */
  port?: number;

  /**
   * Default: false
   *
   * 	If it is true, it writes the console.logs of the emulator onto the main process console.
   */
  debug?: boolean;

  /**
   * Default: '1.0'
   *
   * The consistency level of the Datastore Emulator. [More details](https://cloud.google.com/sdk/gcloud/reference/beta/emulators/datastore/start)
   */
  consistency?: string;

  /**
   * Default: false
   *
   * If it is true, it use docker image to run emulator instead of locally installed version.
   */
  useDocker?: boolean;

  /**
   * Default: 'google/cloud-sdk:latest'
   *
   * This image will be use by docker. The default: [google/cloud-sdk:latest](https://hub.docker.com/r/google/cloud-sdk/)
   */
  dockerImage?: string;
}

declare class DataStoreEmulator {
  constructor(options?: Options);
  start(): Promise<void>;
  stop(): Promise<void>;
}

export = DataStoreEmulator;

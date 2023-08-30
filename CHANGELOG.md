# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [7.1.0](https://github.com/ert78gb/google-datastore-emulator/compare/v7.0.0...v7.1.0) (2023-08-30)


### Features

* support @google-cloud/datastore 8.x ([#130](https://github.com/ert78gb/google-datastore-emulator/issues/130)) ([8b66df6](https://github.com/ert78gb/google-datastore-emulator/commit/8b66df6e6709b5a3e6ae52f1016680cbc8918a53))

## [7.0.0](https://github.com/ert78gb/google-datastore-emulator/compare/v6.0.1...v7.0.0) (2023-06-10)


### ⚠ BREAKING CHANGES

* Require Node.js 16

### Bug Fixes

* bump get-port from 6.1.2 to 7.0.0 ([#127](https://github.com/ert78gb/google-datastore-emulator/issues/127)) ([f5e8aaa](https://github.com/ert78gb/google-datastore-emulator/commit/f5e8aaa83e4e5fc47cba96c5c2c3f4624f744fe9))

### [6.0.1](https://github.com/ert78gb/google-datastore-emulator/compare/v6.0.0...v6.0.1) (2022-12-02)


### Bug Fixes

* bump fs-extra from 10.1.0 to 11.1.0 ([#124](https://github.com/ert78gb/google-datastore-emulator/issues/124)) ([f155a5c](https://github.com/ert78gb/google-datastore-emulator/commit/f155a5c4f2049efa106197e480aa30feb9357755))
* bump get-port from 5.1.1 to 6.1.2 ([#112](https://github.com/ert78gb/google-datastore-emulator/issues/112)) ([f10e20c](https://github.com/ert78gb/google-datastore-emulator/commit/f10e20cb98bdd5127616d331c7415ce158cbd160))

## [6.0.0](https://github.com/ert78gb/google-datastore-emulator/compare/v5.2.0...v6.0.0) (2022-06-22)


### ⚠ BREAKING CHANGES

* drop node 12 support

### Features

* node 18 support ([#119](https://github.com/ert78gb/google-datastore-emulator/issues/119)) ([3b6bfa9](https://github.com/ert78gb/google-datastore-emulator/commit/3b6bfa99c96477fc817923dda2eaee318674fdcb))


### Bug Fixes

* allow @google-cloud/datastore 7.0.0 ([#114](https://github.com/ert78gb/google-datastore-emulator/issues/114)) ([c8bd236](https://github.com/ert78gb/google-datastore-emulator/commit/c8bd2365e3f0414a67ac7e60e57b9f0ad86b2baf))
* handle other "port already in use" error message ([#118](https://github.com/ert78gb/google-datastore-emulator/issues/118)) ([19bd174](https://github.com/ert78gb/google-datastore-emulator/commit/19bd174dea209b7b87c7391c1208c09f91ba1581))

## [5.2.0](https://github.com/ert78gb/google-datastore-emulator/compare/v5.1.0...v5.2.0) (2021-12-30)


### Features

* dynamically allocate emulator port ([#108](https://github.com/ert78gb/google-datastore-emulator/issues/108)) ([6bc29be](https://github.com/ert78gb/google-datastore-emulator/commit/6bc29be434036c96481120c3ef536d834097db6b))


### Bug Fixes

* throw proper exception when emulator can't start because port already in used ([#106](https://github.com/ert78gb/google-datastore-emulator/issues/106)) ([ad26bef](https://github.com/ert78gb/google-datastore-emulator/commit/ad26bef91ff2852346f1013331012ce9f139a548))

## [5.1.0](https://github.com/ert78gb/google-datastore-emulator/compare/v5.0.0...v5.1.0) (2021-12-19)


### Features

* do not allow interactive prompts. ([#103](https://github.com/ert78gb/google-datastore-emulator/issues/103)) ([ca416b8](https://github.com/ert78gb/google-datastore-emulator/commit/ca416b8867c8012db19ce3448c45383c21f88a77))


### Bug Fixes

* bump dockerode from 3.3.0 to 3.3.1 ([#94](https://github.com/ert78gb/google-datastore-emulator/issues/94)) ([0eb499a](https://github.com/ert78gb/google-datastore-emulator/commit/0eb499a16f82a79222478c2e8e9350dad330b1bf))
* remove code duplication of the consistency param calculation ([#102](https://github.com/ert78gb/google-datastore-emulator/issues/102)) ([9f8c963](https://github.com/ert78gb/google-datastore-emulator/commit/9f8c96342f70891138592dfba5e0f20bb92f9cec))
* unsafe shell command construction ([#101](https://github.com/ert78gb/google-datastore-emulator/issues/101)) ([ed31fcf](https://github.com/ert78gb/google-datastore-emulator/commit/ed31fcf0ad5bc944d40f678ce0912f38d38a862e))

## [5.0.0](https://github.com/ert78gb/google-datastore-emulator/compare/v4.0.0...v5.0.0) (2021-07-17)


### ⚠ BREAKING CHANGES

* Drop Node 10 support

### Features

* Node.js 16 support ([#87](https://github.com/ert78gb/google-datastore-emulator/issues/87)) ([85bf68d](https://github.com/ert78gb/google-datastore-emulator/commit/85bf68da23d007c2a1a1f02b3bc968dee5a379e1))

## [4.0.0](https://github.com/ert78gb/google-datastore-emulator/compare/v3.0.2...v4.0.0) (2020-09-05)


### ⚠ BREAKING CHANGES

* supported node 10+
fs-extra dropped older then node 10 support

### Bug Fixes

* change peer dep version @google-cloud/datastore <7.0.0 ([2259622](https://github.com/ert78gb/google-datastore-emulator/commit/225962211483d2b8ac0ad8a3654774c501ae0c09))
* upgrade dockerode => 3.2.1 ([#53](https://github.com/ert78gb/google-datastore-emulator/issues/53)) ([f02fda6](https://github.com/ert78gb/google-datastore-emulator/commit/f02fda6e70bf3df8d6d58da807ea8e4dd69fa681))
* upgrade fs-extra => 9.0.1 ([#54](https://github.com/ert78gb/google-datastore-emulator/issues/54)) ([4841814](https://github.com/ert78gb/google-datastore-emulator/commit/4841814793b3ee8d18f115cbe05685a174396ae7))

### [3.0.2](https://github.com/ert78gb/google-datastore-emulator/compare/v3.0.1...v3.0.2) (2020-02-16)


### Bug Fixes

* upgrade tree-kill => 1.2.2 ([cc1a9c5](https://github.com/ert78gb/google-datastore-emulator/commit/cc1a9c554a7c90ca8110b0c05745a52c5f5db240))

### [3.0.1](https://github.com/ert78gb/google-datastore-emulator/compare/v3.0.0...v3.0.1) (2019-11-23)


### Bug Fixes

* allow @google-cloud/datastore@5.x ([9622751](https://github.com/ert78gb/google-datastore-emulator/commit/9622751292754a788bdffd8f0c51c580d7f9dd0a))

## [3.0.0](https://github.com/ert78gb/google-datastore-emulator/compare/v2.2.2...v3.0.0) (2019-11-14)


### ⚠ BREAKING CHANGES

* The legacy protocol support was removed from Cloud SDK 267.0.0

### Features

* remove 'legacy' parameter ([80d1c7e](https://github.com/ert78gb/google-datastore-emulator/commit/80d1c7e0222bccf64297755ddd449effff76f8d2))

### [2.2.2](https://github.com/ert78gb/google-datastore-emulator/compare/v2.2.1...v2.2.2) (2019-09-05)


### Bug Fixes

* --legacy parameter is deprecated by Google ([8058273](https://github.com/ert78gb/google-datastore-emulator/commit/8058273))

### [2.2.1](https://github.com/ert78gb/google-datastore-emulator/compare/v2.2.0...v2.2.1) (2019-08-25)


### Bug Fixes

* allow @google-cloud/datastore v4 as peer dependency ([0b8b438](https://github.com/ert78gb/google-datastore-emulator/commit/0b8b438))
* data directory creation ([c4e3c77](https://github.com/ert78gb/google-datastore-emulator/commit/c4e3c77))
* kill process of the locally installed sdk ([bfba371](https://github.com/ert78gb/google-datastore-emulator/commit/bfba371))

<a name="2.2.0"></a>
# [2.2.0](https://github.com/ert78gb/google-datastore-emulator/compare/v2.1.1...v2.2.0) (2019-04-18)


### Bug Fixes

* catch docker pull errors ([906a2a6](https://github.com/ert78gb/google-datastore-emulator/commit/906a2a6))


### Features

* support [@google-cloud](https://github.com/google-cloud)/datastore v3 ([#35](https://github.com/ert78gb/google-datastore-emulator/issues/35)) ([f7b4ae2](https://github.com/ert78gb/google-datastore-emulator/commit/f7b4ae2))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/ert78gb/google-datastore-emulator/compare/v2.1.0...v2.1.1) (2019-04-16)


### Bug Fixes

* rename the projectId to project in the TS definitions ([b98b77c](https://github.com/ert78gb/google-datastore-emulator/commit/b98b77c))



<a name="2.1.0"></a>
# 2.1.0 (2018-11-11)


### Bug Fixes

* 2 start after stop ([#27](https://github.com/ert78gb/google-datastore-emulator/issues/27)) ([146233f](https://github.com/ert78gb/google-datastore-emulator/commit/146233f)), closes [#26](https://github.com/ert78gb/google-datastore-emulator/issues/26)
* dockerImage option was not used everywhere ([2302104](https://github.com/ert78gb/google-datastore-emulator/commit/2302104))
* Improve parent process.exit handling ([#7](https://github.com/ert78gb/google-datastore-emulator/issues/7)) ([e4d33fe](https://github.com/ert78gb/google-datastore-emulator/commit/e4d33fe))
* upgrade mocha-appveyor-reporter => 0.4.2 ([00e0896](https://github.com/ert78gb/google-datastore-emulator/commit/00e0896))
* **deps:** [@google-cloud](https://github.com/google-cloud)/datastore 2.x.x support ([#28](https://github.com/ert78gb/google-datastore-emulator/issues/28)) ([c793fa1](https://github.com/ert78gb/google-datastore-emulator/commit/c793fa1))
* **package:** update fs-extra to version 4.0.0 ([#19](https://github.com/ert78gb/google-datastore-emulator/issues/19)) ([7a9be20](https://github.com/ert78gb/google-datastore-emulator/commit/7a9be20))


### Features

* Add Consistency level option ([d12116f](https://github.com/ert78gb/google-datastore-emulator/commit/d12116f))
* Add Docker google/cloud-sdk [#11](https://github.com/ert78gb/google-datastore-emulator/issues/11) ([b4d13b5](https://github.com/ert78gb/google-datastore-emulator/commit/b4d13b5))
* add dockerImage option ([74481b0](https://github.com/ert78gb/google-datastore-emulator/commit/74481b0))



<a name="2.0.1"></a>
## 2.0.1 (2018-11-09)


### Bug Fixes

* **package:** update fs-extra to version 4.0.0 ([#19](https://github.com/ert78gb/google-datastore-emulator/issues/19)) ([7a9be20](https://github.com/ert78gb/google-datastore-emulator/commit/7a9be20))
* 2 start after stop ([#27](https://github.com/ert78gb/google-datastore-emulator/issues/27)) ([146233f](https://github.com/ert78gb/google-datastore-emulator/commit/146233f)), closes [#26](https://github.com/ert78gb/google-datastore-emulator/issues/26)
* dockerImage option was not used everywhere ([2302104](https://github.com/ert78gb/google-datastore-emulator/commit/2302104))
* Improve parent process.exit handling ([#7](https://github.com/ert78gb/google-datastore-emulator/issues/7)) ([e4d33fe](https://github.com/ert78gb/google-datastore-emulator/commit/e4d33fe))


### Features

* Add Consistency level option ([d12116f](https://github.com/ert78gb/google-datastore-emulator/commit/d12116f))
* Add Docker google/cloud-sdk [#11](https://github.com/ert78gb/google-datastore-emulator/issues/11) ([b4d13b5](https://github.com/ert78gb/google-datastore-emulator/commit/b4d13b5))
* add dockerImage option ([74481b0](https://github.com/ert78gb/google-datastore-emulator/commit/74481b0))

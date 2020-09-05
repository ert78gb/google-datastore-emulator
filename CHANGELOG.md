# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.0.0](https://github.com/ert78gb/google-datastore-emulator/compare/v3.0.2...v4.0.0) (2020-09-05)


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

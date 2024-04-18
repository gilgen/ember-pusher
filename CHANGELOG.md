# 3.0.0-alpha.2

* [BREAKING] Removed injection initializer for the `pusher` service.
  The service must now be injected explicitly into any routes or
  controllers where it is used, if you are not already doing so.
  This change is required for Ember 5 support.

# 3.0.0-alpha.0

* Dropped support for Node <12
* Minimally updated to work with Ember 3.28+ / Octane
* `pusher-js` is now a peer dependency; continues to support v4+ (for now)
* Test suite remains broken, most tests marked skipped for now :/
* Note that additional breaking changes may be introduced in future alpha/beta releases prior to 3.0.0 proper

# 2.0.0-beta.1

* Updated to work with Ember 3.4+
* Updated to use pusher-js 4.x
* Removed bower deps
* Test suite is still broken :(

# 0.1.0

* Getting started

window.__ModuleLoader__.load({
	id: "@dsh-jev/plugin",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region \0rolldown/runtime.js
		var __create = Object.create;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __getProtoOf = Object.getPrototypeOf;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __copyProps = (to, from, except, desc) => {
			if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
				key = keys[i];
				if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
			return to;
		};
		var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
			value: mod,
			enumerable: true
		}) : target, mod));
		//#endregion
		let _deepseek_ai_dsh_client_store = require("@deepseek-ai/dsh-client-store");
		let react = require("react");
		react = __toESM(react, 1);
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js
		var _a$1;
		function $constructor(name, initializer, params) {
			function init(inst, def) {
				if (!inst._zod) Object.defineProperty(inst, "_zod", {
					value: {
						def,
						constr: _,
						traits: /* @__PURE__ */ new Set()
					},
					enumerable: false
				});
				if (inst._zod.traits.has(name)) return;
				inst._zod.traits.add(name);
				initializer(inst, def);
				const proto = _.prototype;
				const keys = Object.keys(proto);
				for (let i = 0; i < keys.length; i++) {
					const k = keys[i];
					if (!(k in inst)) inst[k] = proto[k].bind(inst);
				}
			}
			const Parent = params?.Parent ?? Object;
			class Definition extends Parent {}
			Object.defineProperty(Definition, "name", { value: name });
			function _(def) {
				var _a;
				const inst = params?.Parent ? new Definition() : this;
				init(inst, def);
				(_a = inst._zod).deferred ?? (_a.deferred = []);
				for (const fn of inst._zod.deferred) fn();
				return inst;
			}
			Object.defineProperty(_, "init", { value: init });
			Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
				if (params?.Parent && inst instanceof params.Parent) return true;
				return inst?._zod?.traits?.has(name);
			} });
			Object.defineProperty(_, "name", { value: name });
			return _;
		}
		var $ZodAsyncError = class extends Error {
			constructor() {
				super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
			}
		};
		var $ZodEncodeError = class extends Error {
			constructor(name) {
				super(`Encountered unidirectional transform during encode: ${name}`);
				this.name = "ZodEncodeError";
			}
		};
		(_a$1 = globalThis).__zod_globalConfig ?? (_a$1.__zod_globalConfig = {});
		const globalConfig = globalThis.__zod_globalConfig;
		function config(newConfig) {
			if (newConfig) Object.assign(globalConfig, newConfig);
			return globalConfig;
		}
		//#endregion
		//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js
		function getEnumValues(entries) {
			const numericValues = Object.values(entries).filter((v) => typeof v === "number");
			return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
		}
		function jsonStringifyReplacer(_, value) {
			if (typeof value === "bigint") return value.toString();
			return value;
		}
		function cached(getter) {
			return { get value() {
				{
					const value = getter();
					Object.defineProperty(this, "value", { value });
					return value;
				}
				throw new Error("cached value already set");
			} };
		}
		function nullish(input) {
			return input === null || input === void 0;
		}
		function cleanRegex(source) {
			const start = source.startsWith("^") ? 1 : 0;
			const end = source.endsWith("$") ? source.length - 1 : source.length;
			return source.slice(start, end);
		}
		function floatSafeRemainder(val, step) {
			const ratio = val / step;
			const roundedRatio = Math.round(ratio);
			const tolerance = Number.EPSILON * Math.max(Math.abs(ratio), 1);
			if (Math.abs(ratio - roundedRatio) < tolerance) return 0;
			return ratio - roundedRatio;
		}
		const EVALUATING = /* @__PURE__*/ Symbol("evaluating");
		function defineLazy(object, key, getter) {
			let value = void 0;
			Object.defineProperty(object, key, {
				get() {
					if (value === EVALUATING) return;
					if (value === void 0) {
						value = EVALUATING;
						value = getter();
					}
					return value;
				},
				set(v) {
					Object.defineProperty(object, key, { value: v });
				},
				configurable: true
			});
		}
		function assignProp(target, prop, value) {
			Object.defineProperty(target, prop, {
				value,
				writable: true,
				enumerable: true,
				configurable: true
			});
		}
		function mergeDefs(...defs) {
			const mergedDescriptors = {};
			for (const def of defs) {
				const descriptors = Object.getOwnPropertyDescriptors(def);
				Object.assign(mergedDescriptors, descriptors);
			}
			return Object.defineProperties({}, mergedDescriptors);
		}
		function esc(str) {
			return JSON.stringify(str);
		}
		function slugify(input) {
			return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
		}
		const captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
		function isObject(data) {
			return typeof data === "object" && data !== null && !Array.isArray(data);
		}
		const allowsEval = /* @__PURE__*/ cached(() => {
			if (globalConfig.jitless) return false;
			if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
			try {
				new Function("");
				return true;
			} catch (_) {
				return false;
			}
		});
		function isPlainObject(o) {
			if (isObject(o) === false) return false;
			const ctor = o.constructor;
			if (ctor === void 0) return true;
			if (typeof ctor !== "function") return true;
			const prot = ctor.prototype;
			if (isObject(prot) === false) return false;
			if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
			return true;
		}
		function shallowClone(o) {
			if (isPlainObject(o)) return { ...o };
			if (Array.isArray(o)) return [...o];
			if (o instanceof Map) return new Map(o);
			if (o instanceof Set) return new Set(o);
			return o;
		}
		const propertyKeyTypes = /* @__PURE__*/ new Set([
			"string",
			"number",
			"symbol"
		]);
		function escapeRegex(str) {
			return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}
		function clone(inst, def, params) {
			const cl = new inst._zod.constr(def ?? inst._zod.def);
			if (!def || params?.parent) cl._zod.parent = inst;
			return cl;
		}
		function normalizeParams(_params) {
			const params = _params;
			if (!params) return {};
			if (typeof params === "string") return { error: () => params };
			if (params?.message !== void 0) {
				if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
				params.error = params.message;
			}
			delete params.message;
			if (typeof params.error === "string") return {
				...params,
				error: () => params.error
			};
			return params;
		}
		function optionalKeys(shape) {
			return Object.keys(shape).filter((k) => {
				return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
			});
		}
		const NUMBER_FORMAT_RANGES = {
			safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
			int32: [-2147483648, 2147483647],
			uint32: [0, 4294967295],
			float32: [-34028234663852886e22, 34028234663852886e22],
			float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
		};
		function pick(schema, mask) {
			const currDef = schema._zod.def;
			const checks = currDef.checks;
			if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
			return clone(schema, mergeDefs(schema._zod.def, {
				get shape() {
					const newShape = {};
					for (const key in mask) {
						if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						newShape[key] = currDef.shape[key];
					}
					assignProp(this, "shape", newShape);
					return newShape;
				},
				checks: []
			}));
		}
		function omit(schema, mask) {
			const currDef = schema._zod.def;
			const checks = currDef.checks;
			if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
			return clone(schema, mergeDefs(schema._zod.def, {
				get shape() {
					const newShape = { ...schema._zod.def.shape };
					for (const key in mask) {
						if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						delete newShape[key];
					}
					assignProp(this, "shape", newShape);
					return newShape;
				},
				checks: []
			}));
		}
		function extend(schema, shape) {
			if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
			const checks = schema._zod.def.checks;
			if (checks && checks.length > 0) {
				const existingShape = schema._zod.def.shape;
				for (const key in shape) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
			}
			return clone(schema, mergeDefs(schema._zod.def, { get shape() {
				const _shape = {
					...schema._zod.def.shape,
					...shape
				};
				assignProp(this, "shape", _shape);
				return _shape;
			} }));
		}
		function safeExtend(schema, shape) {
			if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
			return clone(schema, mergeDefs(schema._zod.def, { get shape() {
				const _shape = {
					...schema._zod.def.shape,
					...shape
				};
				assignProp(this, "shape", _shape);
				return _shape;
			} }));
		}
		function merge(a, b) {
			if (a._zod.def.checks?.length) throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
			return clone(a, mergeDefs(a._zod.def, {
				get shape() {
					const _shape = {
						...a._zod.def.shape,
						...b._zod.def.shape
					};
					assignProp(this, "shape", _shape);
					return _shape;
				},
				get catchall() {
					return b._zod.def.catchall;
				},
				checks: b._zod.def.checks ?? []
			}));
		}
		function partial(Class, schema, mask) {
			const checks = schema._zod.def.checks;
			if (checks && checks.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
			return clone(schema, mergeDefs(schema._zod.def, {
				get shape() {
					const oldShape = schema._zod.def.shape;
					const shape = { ...oldShape };
					if (mask) for (const key in mask) {
						if (!(key in oldShape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						shape[key] = Class ? new Class({
							type: "optional",
							innerType: oldShape[key]
						}) : oldShape[key];
					}
					else for (const key in oldShape) shape[key] = Class ? new Class({
						type: "optional",
						innerType: oldShape[key]
					}) : oldShape[key];
					assignProp(this, "shape", shape);
					return shape;
				},
				checks: []
			}));
		}
		function required(Class, schema, mask) {
			return clone(schema, mergeDefs(schema._zod.def, { get shape() {
				const oldShape = schema._zod.def.shape;
				const shape = { ...oldShape };
				if (mask) for (const key in mask) {
					if (!(key in shape)) throw new Error(`Unrecognized key: "${key}"`);
					if (!mask[key]) continue;
					shape[key] = new Class({
						type: "nonoptional",
						innerType: oldShape[key]
					});
				}
				else for (const key in oldShape) shape[key] = new Class({
					type: "nonoptional",
					innerType: oldShape[key]
				});
				assignProp(this, "shape", shape);
				return shape;
			} }));
		}
		function aborted(x, startIndex = 0) {
			if (x.aborted === true) return true;
			for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
			return false;
		}
		function explicitlyAborted(x, startIndex = 0) {
			if (x.aborted === true) return true;
			for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue === false) return true;
			return false;
		}
		function prefixIssues(path, issues) {
			return issues.map((iss) => {
				var _a;
				(_a = iss).path ?? (_a.path = []);
				iss.path.unshift(path);
				return iss;
			});
		}
		function unwrapMessage(message) {
			return typeof message === "string" ? message : message?.message;
		}
		function finalizeIssue(iss, ctx, config) {
			const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
			const { inst: _inst, continue: _continue, input: _input, ...rest } = iss;
			rest.path ?? (rest.path = []);
			rest.message = message;
			if (ctx?.reportInput) rest.input = _input;
			return rest;
		}
		function getLengthableOrigin(input) {
			if (Array.isArray(input)) return "array";
			if (typeof input === "string") return "string";
			return "unknown";
		}
		function issue(...args) {
			const [iss, input, inst] = args;
			if (typeof iss === "string") return {
				message: iss,
				code: "custom",
				input,
				inst
			};
			return { ...iss };
		}
		//#endregion
		//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/errors.js
		const initializer$1 = (inst, def) => {
			inst.name = "$ZodError";
			Object.defineProperty(inst, "_zod", {
				value: inst._zod,
				enumerable: false
			});
			Object.defineProperty(inst, "issues", {
				value: def,
				enumerable: false
			});
			inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
			Object.defineProperty(inst, "toString", {
				value: () => inst.message,
				enumerable: false
			});
		};
		const $ZodError = $constructor("$ZodError", initializer$1);
		const $ZodRealError = $constructor("$ZodError", initializer$1, { Parent: Error });
		function flattenError(error, mapper = (issue) => issue.message) {
			const fieldErrors = {};
			const formErrors = [];
			for (const sub of error.issues) if (sub.path.length > 0) {
				fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
				fieldErrors[sub.path[0]].push(mapper(sub));
			} else formErrors.push(mapper(sub));
			return {
				formErrors,
				fieldErrors
			};
		}
		function formatError(error, mapper = (issue) => issue.message) {
			const fieldErrors = { _errors: [] };
			const processError = (error, path = []) => {
				for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
				else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
				else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
				else {
					const fullpath = [...path, ...issue.path];
					if (fullpath.length === 0) fieldErrors._errors.push(mapper(issue));
					else {
						let curr = fieldErrors;
						let i = 0;
						while (i < fullpath.length) {
							const el = fullpath[i];
							if (!(i === fullpath.length - 1)) curr[el] = curr[el] || { _errors: [] };
							else {
								curr[el] = curr[el] || { _errors: [] };
								curr[el]._errors.push(mapper(issue));
							}
							curr = curr[el];
							i++;
						}
					}
				}
			};
			processError(error);
			return fieldErrors;
		}
		//#endregion
		//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/parse.js
		const _parse = (_Err) => (schema, value, _ctx, _params) => {
			const ctx = _ctx ? {
				..._ctx,
				async: false
			} : { async: false };
			const result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) throw new $ZodAsyncError();
			if (result.issues.length) {
				const e = new ((_params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
				captureStackTrace(e, _params?.callee);
				throw e;
			}
			return result.value;
		};
		const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
			const ctx = _ctx ? {
				..._ctx,
				async: true
			} : { async: true };
			let result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) result = await result;
			if (result.issues.length) {
				const e = new ((params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
				captureStackTrace(e, params?.callee);
				throw e;
			}
			return result.value;
		};
		const _safeParse = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				async: false
			} : { async: false };
			const result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) throw new $ZodAsyncError();
			return result.issues.length ? {
				success: false,
				error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			} : {
				success: true,
				data: result.value
			};
		};
		const safeParse$1 = /* @__PURE__*/ _safeParse($ZodRealError);
		const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				async: true
			} : { async: true };
			let result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) result = await result;
			return result.issues.length ? {
				success: false,
				error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			} : {
				success: true,
				data: result.value
			};
		};
		const safeParseAsync$1 = /* @__PURE__*/ _safeParseAsync($ZodRealError);
		const _encode = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _parse(_Err)(schema, value, ctx);
		};
		const _decode = (_Err) => (schema, value, _ctx) => {
			return _parse(_Err)(schema, value, _ctx);
		};
		const _encodeAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _parseAsync(_Err)(schema, value, ctx);
		};
		const _decodeAsync = (_Err) => async (schema, value, _ctx) => {
			return _parseAsync(_Err)(schema, value, _ctx);
		};
		const _safeEncode = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _safeParse(_Err)(schema, value, ctx);
		};
		const _safeDecode = (_Err) => (schema, value, _ctx) => {
			return _safeParse(_Err)(schema, value, _ctx);
		};
		const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _safeParseAsync(_Err)(schema, value, ctx);
		};
		const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
			return _safeParseAsync(_Err)(schema, value, _ctx);
		};
		//#endregion
		//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/regexes.js
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link cuid2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const cuid = /^[cC][0-9a-z]{6,}$/;
		const cuid2 = /^[0-9a-z]+$/;
		const ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
		const xid = /^[0-9a-vA-V]{20}$/;
		const ksuid = /^[A-Za-z0-9]{27}$/;
		const nanoid = /^[a-zA-Z0-9_-]{21}$/;
		/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
		const duration$1 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
		/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
		const guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
		/** Returns a regex for validating an RFC 9562/4122 UUID.
		*
		* @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
		const uuid = (version) => {
			if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
			return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
		};
		/** Practical email validation */
		const email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
		const _emoji$1 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
		function emoji() {
			return new RegExp(_emoji$1, "u");
		}
		const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
		const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
		const cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
		const cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
		const base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
		const base64url = /^[A-Za-z0-9_-]*$/;
		const httpProtocol = /^https?$/;
		const e164 = /^\+[1-9]\d{6,14}$/;
		const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
		const date$1 = /*@__PURE__*/ new RegExp(`^${dateSource}$`);
		function timeSource(args) {
			const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
			return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
		}
		function time$1(args) {
			return new RegExp(`^${timeSource(args)}$`);
		}
		function datetime$1(args) {
			const time = timeSource({ precision: args.precision });
			const opts = ["Z"];
			if (args.local) opts.push("");
			if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
			const timeRegex = `${time}(?:${opts.join("|")})`;
			return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
		}
		const string$1 = (params) => {
			const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
			return new RegExp(`^${regex}$`);
		};
		const integer = /^-?\d+$/;
		const number$1 = /^-?\d+(?:\.\d+)?$/;
		const boolean$1 = /^(?:true|false)$/i;
		const _undefined$2 = /^undefined$/i;
		const lowercase = /^[^A-Z]*$/;
		const uppercase = /^[^a-z]*$/;
		//#endregion
		//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/checks.js
		const $ZodCheck = /*@__PURE__*/ $constructor("$ZodCheck", (inst, def) => {
			var _a;
			inst._zod ?? (inst._zod = {});
			inst._zod.def = def;
			(_a = inst._zod).onattach ?? (_a.onattach = []);
		});
		const numericOriginMap = {
			number: "number",
			bigint: "bigint",
			object: "date"
		};
		const $ZodCheckLessThan = /*@__PURE__*/ $constructor("$ZodCheckLessThan", (inst, def) => {
			$ZodCheck.init(inst, def);
			const origin = numericOriginMap[typeof def.value];
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
				if (def.value < curr) if (def.inclusive) bag.maximum = def.value;
				else bag.exclusiveMaximum = def.value;
			});
			inst._zod.check = (payload) => {
				if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
				payload.issues.push({
					origin,
					code: "too_big",
					maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
					input: payload.value,
					inclusive: def.inclusive,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckGreaterThan = /*@__PURE__*/ $constructor("$ZodCheckGreaterThan", (inst, def) => {
			$ZodCheck.init(inst, def);
			const origin = numericOriginMap[typeof def.value];
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
				if (def.value > curr) if (def.inclusive) bag.minimum = def.value;
				else bag.exclusiveMinimum = def.value;
			});
			inst._zod.check = (payload) => {
				if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
				payload.issues.push({
					origin,
					code: "too_small",
					minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
					input: payload.value,
					inclusive: def.inclusive,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMultipleOf = /*@__PURE__*/ $constructor("$ZodCheckMultipleOf", (inst, def) => {
			$ZodCheck.init(inst, def);
			inst._zod.onattach.push((inst) => {
				var _a;
				(_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
			});
			inst._zod.check = (payload) => {
				if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				if (typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0) return;
				payload.issues.push({
					origin: typeof payload.value,
					code: "not_multiple_of",
					divisor: def.value,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckNumberFormat = /*@__PURE__*/ $constructor("$ZodCheckNumberFormat", (inst, def) => {
			$ZodCheck.init(inst, def);
			def.format = def.format || "float64";
			const isInt = def.format?.includes("int");
			const origin = isInt ? "int" : "number";
			const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.format = def.format;
				bag.minimum = minimum;
				bag.maximum = maximum;
				if (isInt) bag.pattern = integer;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (isInt) {
					if (!Number.isInteger(input)) {
						payload.issues.push({
							expected: origin,
							format: def.format,
							code: "invalid_type",
							continue: false,
							input,
							inst
						});
						return;
					}
					if (!Number.isSafeInteger(input)) {
						if (input > 0) payload.issues.push({
							input,
							code: "too_big",
							maximum: Number.MAX_SAFE_INTEGER,
							note: "Integers must be within the safe integer range.",
							inst,
							origin,
							inclusive: true,
							continue: !def.abort
						});
						else payload.issues.push({
							input,
							code: "too_small",
							minimum: Number.MIN_SAFE_INTEGER,
							note: "Integers must be within the safe integer range.",
							inst,
							origin,
							inclusive: true,
							continue: !def.abort
						});
						return;
					}
				}
				if (input < minimum) payload.issues.push({
					origin: "number",
					input,
					code: "too_small",
					minimum,
					inclusive: true,
					inst,
					continue: !def.abort
				});
				if (input > maximum) payload.issues.push({
					origin: "number",
					input,
					code: "too_big",
					maximum,
					inclusive: true,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMaxLength = /*@__PURE__*/ $constructor("$ZodCheckMaxLength", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = (payload) => {
				const val = payload.value;
				return !nullish(val) && val.length !== void 0;
			});
			inst._zod.onattach.push((inst) => {
				const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
				if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (input.length <= def.maximum) return;
				const origin = getLengthableOrigin(input);
				payload.issues.push({
					origin,
					code: "too_big",
					maximum: def.maximum,
					inclusive: true,
					input,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMinLength = /*@__PURE__*/ $constructor("$ZodCheckMinLength", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = (payload) => {
				const val = payload.value;
				return !nullish(val) && val.length !== void 0;
			});
			inst._zod.onattach.push((inst) => {
				const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
				if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (input.length >= def.minimum) return;
				const origin = getLengthableOrigin(input);
				payload.issues.push({
					origin,
					code: "too_small",
					minimum: def.minimum,
					inclusive: true,
					input,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckLengthEquals = /*@__PURE__*/ $constructor("$ZodCheckLengthEquals", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = (payload) => {
				const val = payload.value;
				return !nullish(val) && val.length !== void 0;
			});
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.minimum = def.length;
				bag.maximum = def.length;
				bag.length = def.length;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				const length = input.length;
				if (length === def.length) return;
				const origin = getLengthableOrigin(input);
				const tooBig = length > def.length;
				payload.issues.push({
					origin,
					...tooBig ? {
						code: "too_big",
						maximum: def.length
					} : {
						code: "too_small",
						minimum: def.length
					},
					inclusive: true,
					exact: true,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckStringFormat = /*@__PURE__*/ $constructor("$ZodCheckStringFormat", (inst, def) => {
			var _a, _b;
			$ZodCheck.init(inst, def);
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.format = def.format;
				if (def.pattern) {
					bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
					bag.patterns.add(def.pattern);
				}
			});
			if (def.pattern) (_a = inst._zod).check ?? (_a.check = (payload) => {
				def.pattern.lastIndex = 0;
				if (def.pattern.test(payload.value)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: def.format,
					input: payload.value,
					...def.pattern ? { pattern: def.pattern.toString() } : {},
					inst,
					continue: !def.abort
				});
			});
			else (_b = inst._zod).check ?? (_b.check = () => {});
		});
		const $ZodCheckRegex = /*@__PURE__*/ $constructor("$ZodCheckRegex", (inst, def) => {
			$ZodCheckStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				def.pattern.lastIndex = 0;
				if (def.pattern.test(payload.value)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "regex",
					input: payload.value,
					pattern: def.pattern.toString(),
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckLowerCase = /*@__PURE__*/ $constructor("$ZodCheckLowerCase", (inst, def) => {
			def.pattern ?? (def.pattern = lowercase);
			$ZodCheckStringFormat.init(inst, def);
		});
		const $ZodCheckUpperCase = /*@__PURE__*/ $constructor("$ZodCheckUpperCase", (inst, def) => {
			def.pattern ?? (def.pattern = uppercase);
			$ZodCheckStringFormat.init(inst, def);
		});
		const $ZodCheckIncludes = /*@__PURE__*/ $constructor("$ZodCheckIncludes", (inst, def) => {
			$ZodCheck.init(inst, def);
			const escapedRegex = escapeRegex(def.includes);
			const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
			def.pattern = pattern;
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(pattern);
			});
			inst._zod.check = (payload) => {
				if (payload.value.includes(def.includes, def.position)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "includes",
					includes: def.includes,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckStartsWith = /*@__PURE__*/ $constructor("$ZodCheckStartsWith", (inst, def) => {
			$ZodCheck.init(inst, def);
			const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
			def.pattern ?? (def.pattern = pattern);
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(pattern);
			});
			inst._zod.check = (payload) => {
				if (payload.value.startsWith(def.prefix)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "starts_with",
					prefix: def.prefix,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckEndsWith = /*@__PURE__*/ $constructor("$ZodCheckEndsWith", (inst, def) => {
			$ZodCheck.init(inst, def);
			const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
			def.pattern ?? (def.pattern = pattern);
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(pattern);
			});
			inst._zod.check = (payload) => {
				if (payload.value.endsWith(def.suffix)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "ends_with",
					suffix: def.suffix,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckOverwrite = /*@__PURE__*/ $constructor("$ZodCheckOverwrite", (inst, def) => {
			$ZodCheck.init(inst, def);
			inst._zod.check = (payload) => {
				payload.value = def.tx(payload.value);
			};
		});
		//#endregion
		//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/doc.js
		var Doc = class {
			constructor(args = []) {
				this.content = [];
				this.indent = 0;
				if (this) this.args = args;
			}
			indented(fn) {
				this.indent += 1;
				fn(this);
				this.indent -= 1;
			}
			write(arg) {
				if (typeof arg === "function") {
					arg(this, { execution: "sync" });
					arg(this, { execution: "async" });
					return;
				}
				const lines = arg.split("\n").filter((x) => x);
				const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
				const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
				for (const line of dedented) this.content.push(line);
			}
			compile() {
				const F = Function;
				const args = this?.args;
				const lines = [...(this?.content ?? [``]).map((x) => `  ${x}`)];
				return new F(...args, lines.join("\n"));
			}
		};
		//#endregion
		//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/versions.js
		const version = {
			major: 4,
			minor: 4,
			patch: 3
		};
		//#endregion
		//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/schemas.js
		const $ZodType = /*@__PURE__*/ $constructor("$ZodType", (inst, def) => {
			var _a;
			inst ?? (inst = {});
			inst._zod.def = def;
			inst._zod.bag = inst._zod.bag || {};
			inst._zod.version = version;
			const checks = [...inst._zod.def.checks ?? []];
			if (inst._zod.traits.has("$ZodCheck")) checks.unshift(inst);
			for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
			if (checks.length === 0) {
				(_a = inst._zod).deferred ?? (_a.deferred = []);
				inst._zod.deferred?.push(() => {
					inst._zod.run = inst._zod.parse;
				});
			} else {
				const runChecks = (payload, checks, ctx) => {
					let isAborted = aborted(payload);
					let asyncResult;
					for (const ch of checks) {
						if (ch._zod.def.when) {
							if (explicitlyAborted(payload)) continue;
							if (!ch._zod.def.when(payload)) continue;
						} else if (isAborted) continue;
						const currLen = payload.issues.length;
						const _ = ch._zod.check(payload);
						if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
						if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
							await _;
							if (payload.issues.length === currLen) return;
							if (!isAborted) isAborted = aborted(payload, currLen);
						});
						else {
							if (payload.issues.length === currLen) continue;
							if (!isAborted) isAborted = aborted(payload, currLen);
						}
					}
					if (asyncResult) return asyncResult.then(() => {
						return payload;
					});
					return payload;
				};
				const handleCanaryResult = (canary, payload, ctx) => {
					if (aborted(canary)) {
						canary.aborted = true;
						return canary;
					}
					const checkResult = runChecks(payload, checks, ctx);
					if (checkResult instanceof Promise) {
						if (ctx.async === false) throw new $ZodAsyncError();
						return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
					}
					return inst._zod.parse(checkResult, ctx);
				};
				inst._zod.run = (payload, ctx) => {
					if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
					if (ctx.direction === "backward") {
						const canary = inst._zod.parse({
							value: payload.value,
							issues: []
						}, {
							...ctx,
							skipChecks: true
						});
						if (canary instanceof Promise) return canary.then((canary) => {
							return handleCanaryResult(canary, payload, ctx);
						});
						return handleCanaryResult(canary, payload, ctx);
					}
					const result = inst._zod.parse(payload, ctx);
					if (result instanceof Promise) {
						if (ctx.async === false) throw new $ZodAsyncError();
						return result.then((result) => runChecks(result, checks, ctx));
					}
					return runChecks(result, checks, ctx);
				};
			}
			defineLazy(inst, "~standard", () => ({
				validate: (value) => {
					try {
						const r = safeParse$1(inst, value);
						return r.success ? { value: r.data } : { issues: r.error?.issues };
					} catch (_) {
						return safeParseAsync$1(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
					}
				},
				vendor: "zod",
				version: 1
			}));
		});
		const $ZodString = /*@__PURE__*/ $constructor("$ZodString", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string$1(inst._zod.bag);
			inst._zod.parse = (payload, _) => {
				if (def.coerce) try {
					payload.value = String(payload.value);
				} catch (_) {}
				if (typeof payload.value === "string") return payload;
				payload.issues.push({
					expected: "string",
					code: "invalid_type",
					input: payload.value,
					inst
				});
				return payload;
			};
		});
		const $ZodStringFormat = /*@__PURE__*/ $constructor("$ZodStringFormat", (inst, def) => {
			$ZodCheckStringFormat.init(inst, def);
			$ZodString.init(inst, def);
		});
		const $ZodGUID = /*@__PURE__*/ $constructor("$ZodGUID", (inst, def) => {
			def.pattern ?? (def.pattern = guid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodUUID = /*@__PURE__*/ $constructor("$ZodUUID", (inst, def) => {
			if (def.version) {
				const v = {
					v1: 1,
					v2: 2,
					v3: 3,
					v4: 4,
					v5: 5,
					v6: 6,
					v7: 7,
					v8: 8
				}[def.version];
				if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
				def.pattern ?? (def.pattern = uuid(v));
			} else def.pattern ?? (def.pattern = uuid());
			$ZodStringFormat.init(inst, def);
		});
		const $ZodEmail = /*@__PURE__*/ $constructor("$ZodEmail", (inst, def) => {
			def.pattern ?? (def.pattern = email);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodURL = /*@__PURE__*/ $constructor("$ZodURL", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				try {
					const trimmed = payload.value.trim();
					if (!def.normalize && def.protocol?.source === httpProtocol.source) {
						if (!/^https?:\/\//i.test(trimmed)) {
							payload.issues.push({
								code: "invalid_format",
								format: "url",
								note: "Invalid URL format",
								input: payload.value,
								inst,
								continue: !def.abort
							});
							return;
						}
					}
					const url = new URL(trimmed);
					if (def.hostname) {
						def.hostname.lastIndex = 0;
						if (!def.hostname.test(url.hostname)) payload.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid hostname",
							pattern: def.hostname.source,
							input: payload.value,
							inst,
							continue: !def.abort
						});
					}
					if (def.protocol) {
						def.protocol.lastIndex = 0;
						if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) payload.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid protocol",
							pattern: def.protocol.source,
							input: payload.value,
							inst,
							continue: !def.abort
						});
					}
					if (def.normalize) payload.value = url.href;
					else payload.value = trimmed;
					return;
				} catch (_) {
					payload.issues.push({
						code: "invalid_format",
						format: "url",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		const $ZodEmoji = /*@__PURE__*/ $constructor("$ZodEmoji", (inst, def) => {
			def.pattern ?? (def.pattern = emoji());
			$ZodStringFormat.init(inst, def);
		});
		const $ZodNanoID = /*@__PURE__*/ $constructor("$ZodNanoID", (inst, def) => {
			def.pattern ?? (def.pattern = nanoid);
			$ZodStringFormat.init(inst, def);
		});
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const $ZodCUID = /*@__PURE__*/ $constructor("$ZodCUID", (inst, def) => {
			def.pattern ?? (def.pattern = cuid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodCUID2 = /*@__PURE__*/ $constructor("$ZodCUID2", (inst, def) => {
			def.pattern ?? (def.pattern = cuid2);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodULID = /*@__PURE__*/ $constructor("$ZodULID", (inst, def) => {
			def.pattern ?? (def.pattern = ulid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodXID = /*@__PURE__*/ $constructor("$ZodXID", (inst, def) => {
			def.pattern ?? (def.pattern = xid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodKSUID = /*@__PURE__*/ $constructor("$ZodKSUID", (inst, def) => {
			def.pattern ?? (def.pattern = ksuid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODateTime = /*@__PURE__*/ $constructor("$ZodISODateTime", (inst, def) => {
			def.pattern ?? (def.pattern = datetime$1(def));
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODate = /*@__PURE__*/ $constructor("$ZodISODate", (inst, def) => {
			def.pattern ?? (def.pattern = date$1);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISOTime = /*@__PURE__*/ $constructor("$ZodISOTime", (inst, def) => {
			def.pattern ?? (def.pattern = time$1(def));
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODuration = /*@__PURE__*/ $constructor("$ZodISODuration", (inst, def) => {
			def.pattern ?? (def.pattern = duration$1);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodIPv4 = /*@__PURE__*/ $constructor("$ZodIPv4", (inst, def) => {
			def.pattern ?? (def.pattern = ipv4);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.format = `ipv4`;
		});
		const $ZodIPv6 = /*@__PURE__*/ $constructor("$ZodIPv6", (inst, def) => {
			def.pattern ?? (def.pattern = ipv6);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.format = `ipv6`;
			inst._zod.check = (payload) => {
				try {
					new URL(`http://[${payload.value}]`);
				} catch {
					payload.issues.push({
						code: "invalid_format",
						format: "ipv6",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		const $ZodCIDRv4 = /*@__PURE__*/ $constructor("$ZodCIDRv4", (inst, def) => {
			def.pattern ?? (def.pattern = cidrv4);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodCIDRv6 = /*@__PURE__*/ $constructor("$ZodCIDRv6", (inst, def) => {
			def.pattern ?? (def.pattern = cidrv6);
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				const parts = payload.value.split("/");
				try {
					if (parts.length !== 2) throw new Error();
					const [address, prefix] = parts;
					if (!prefix) throw new Error();
					const prefixNum = Number(prefix);
					if (`${prefixNum}` !== prefix) throw new Error();
					if (prefixNum < 0 || prefixNum > 128) throw new Error();
					new URL(`http://[${address}]`);
				} catch {
					payload.issues.push({
						code: "invalid_format",
						format: "cidrv6",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		function isValidBase64(data) {
			if (data === "") return true;
			if (/\s/.test(data)) return false;
			if (data.length % 4 !== 0) return false;
			try {
				atob(data);
				return true;
			} catch {
				return false;
			}
		}
		const $ZodBase64 = /*@__PURE__*/ $constructor("$ZodBase64", (inst, def) => {
			def.pattern ?? (def.pattern = base64);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.contentEncoding = "base64";
			inst._zod.check = (payload) => {
				if (isValidBase64(payload.value)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "base64",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		function isValidBase64URL(data) {
			if (!base64url.test(data)) return false;
			const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
			return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
		}
		const $ZodBase64URL = /*@__PURE__*/ $constructor("$ZodBase64URL", (inst, def) => {
			def.pattern ?? (def.pattern = base64url);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.contentEncoding = "base64url";
			inst._zod.check = (payload) => {
				if (isValidBase64URL(payload.value)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "base64url",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodE164 = /*@__PURE__*/ $constructor("$ZodE164", (inst, def) => {
			def.pattern ?? (def.pattern = e164);
			$ZodStringFormat.init(inst, def);
		});
		function isValidJWT(token, algorithm = null) {
			try {
				const tokensParts = token.split(".");
				if (tokensParts.length !== 3) return false;
				const [header] = tokensParts;
				if (!header) return false;
				const parsedHeader = JSON.parse(atob(header));
				if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
				if (!parsedHeader.alg) return false;
				if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
				return true;
			} catch {
				return false;
			}
		}
		const $ZodJWT = /*@__PURE__*/ $constructor("$ZodJWT", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				if (isValidJWT(payload.value, def.alg)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "jwt",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodNumber = /*@__PURE__*/ $constructor("$ZodNumber", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = inst._zod.bag.pattern ?? number$1;
			inst._zod.parse = (payload, _ctx) => {
				if (def.coerce) try {
					payload.value = Number(payload.value);
				} catch (_) {}
				const input = payload.value;
				if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
				const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
				payload.issues.push({
					expected: "number",
					code: "invalid_type",
					input,
					inst,
					...received ? { received } : {}
				});
				return payload;
			};
		});
		const $ZodNumberFormat = /*@__PURE__*/ $constructor("$ZodNumberFormat", (inst, def) => {
			$ZodCheckNumberFormat.init(inst, def);
			$ZodNumber.init(inst, def);
		});
		const $ZodBoolean = /*@__PURE__*/ $constructor("$ZodBoolean", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = boolean$1;
			inst._zod.parse = (payload, _ctx) => {
				if (def.coerce) try {
					payload.value = Boolean(payload.value);
				} catch (_) {}
				const input = payload.value;
				if (typeof input === "boolean") return payload;
				payload.issues.push({
					expected: "boolean",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodUndefined = /*@__PURE__*/ $constructor("$ZodUndefined", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = _undefined$2;
			inst._zod.values = /* @__PURE__ */ new Set([void 0]);
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (typeof input === "undefined") return payload;
				payload.issues.push({
					expected: "undefined",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodUnknown = /*@__PURE__*/ $constructor("$ZodUnknown", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload) => payload;
		});
		const $ZodNever = /*@__PURE__*/ $constructor("$ZodNever", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, _ctx) => {
				payload.issues.push({
					expected: "never",
					code: "invalid_type",
					input: payload.value,
					inst
				});
				return payload;
			};
		});
		const $ZodVoid = /*@__PURE__*/ $constructor("$ZodVoid", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (typeof input === "undefined") return payload;
				payload.issues.push({
					expected: "void",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			};
		});
		function handleArrayResult(result, final, index) {
			if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
			final.value[index] = result.value;
		}
		const $ZodArray = /*@__PURE__*/ $constructor("$ZodArray", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, ctx) => {
				const input = payload.value;
				if (!Array.isArray(input)) {
					payload.issues.push({
						expected: "array",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				payload.value = Array(input.length);
				const proms = [];
				for (let i = 0; i < input.length; i++) {
					const item = input[i];
					const result = def.element._zod.run({
						value: item,
						issues: []
					}, ctx);
					if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
					else handleArrayResult(result, payload, i);
				}
				if (proms.length) return Promise.all(proms).then(() => payload);
				return payload;
			};
		});
		function handlePropertyResult(result, final, key, input, isOptionalIn, isOptionalOut) {
			const isPresent = key in input;
			if (result.issues.length) {
				if (isOptionalIn && isOptionalOut && !isPresent) return;
				final.issues.push(...prefixIssues(key, result.issues));
			}
			if (!isPresent && !isOptionalIn) {
				if (!result.issues.length) final.issues.push({
					code: "invalid_type",
					expected: "nonoptional",
					input: void 0,
					path: [key]
				});
				return;
			}
			if (result.value === void 0) {
				if (isPresent) final.value[key] = void 0;
			} else final.value[key] = result.value;
		}
		function normalizeDef(def) {
			const keys = Object.keys(def.shape);
			for (const k of keys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
			const okeys = optionalKeys(def.shape);
			return {
				...def,
				keys,
				keySet: new Set(keys),
				numKeys: keys.length,
				optionalKeys: new Set(okeys)
			};
		}
		function handleCatchall(proms, input, payload, ctx, def, inst) {
			const unrecognized = [];
			const keySet = def.keySet;
			const _catchall = def.catchall._zod;
			const t = _catchall.def.type;
			const isOptionalIn = _catchall.optin === "optional";
			const isOptionalOut = _catchall.optout === "optional";
			for (const key in input) {
				if (key === "__proto__") continue;
				if (keySet.has(key)) continue;
				if (t === "never") {
					unrecognized.push(key);
					continue;
				}
				const r = _catchall.run({
					value: input[key],
					issues: []
				}, ctx);
				if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
				else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
			}
			if (unrecognized.length) payload.issues.push({
				code: "unrecognized_keys",
				keys: unrecognized,
				input,
				inst
			});
			if (!proms.length) return payload;
			return Promise.all(proms).then(() => {
				return payload;
			});
		}
		const $ZodObject = /*@__PURE__*/ $constructor("$ZodObject", (inst, def) => {
			$ZodType.init(inst, def);
			if (!Object.getOwnPropertyDescriptor(def, "shape")?.get) {
				const sh = def.shape;
				Object.defineProperty(def, "shape", { get: () => {
					const newSh = { ...sh };
					Object.defineProperty(def, "shape", { value: newSh });
					return newSh;
				} });
			}
			const _normalized = cached(() => normalizeDef(def));
			defineLazy(inst._zod, "propValues", () => {
				const shape = def.shape;
				const propValues = {};
				for (const key in shape) {
					const field = shape[key]._zod;
					if (field.values) {
						propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
						for (const v of field.values) propValues[key].add(v);
					}
				}
				return propValues;
			});
			const isObject$2 = isObject;
			const catchall = def.catchall;
			let value;
			inst._zod.parse = (payload, ctx) => {
				value ?? (value = _normalized.value);
				const input = payload.value;
				if (!isObject$2(input)) {
					payload.issues.push({
						expected: "object",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				payload.value = {};
				const proms = [];
				const shape = value.shape;
				for (const key of value.keys) {
					const el = shape[key];
					const isOptionalIn = el._zod.optin === "optional";
					const isOptionalOut = el._zod.optout === "optional";
					const r = el._zod.run({
						value: input[key],
						issues: []
					}, ctx);
					if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
					else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
				}
				if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
				return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
			};
		});
		const $ZodObjectJIT = /*@__PURE__*/ $constructor("$ZodObjectJIT", (inst, def) => {
			$ZodObject.init(inst, def);
			const superParse = inst._zod.parse;
			const _normalized = cached(() => normalizeDef(def));
			const generateFastpass = (shape) => {
				const doc = new Doc([
					"shape",
					"payload",
					"ctx"
				]);
				const normalized = _normalized.value;
				const parseStr = (key) => {
					const k = esc(key);
					return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
				};
				doc.write(`const input = payload.value;`);
				const ids = Object.create(null);
				let counter = 0;
				for (const key of normalized.keys) ids[key] = `key_${counter++}`;
				doc.write(`const newResult = {};`);
				for (const key of normalized.keys) {
					const id = ids[key];
					const k = esc(key);
					const schema = shape[key];
					const isOptionalIn = schema?._zod?.optin === "optional";
					const isOptionalOut = schema?._zod?.optout === "optional";
					doc.write(`const ${id} = ${parseStr(key)};`);
					if (isOptionalIn && isOptionalOut) doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
					else if (!isOptionalIn) doc.write(`
        const ${id}_present = ${k} in input;
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
        }

        if (${id}_present) {
          if (${id}.value === undefined) {
            newResult[${k}] = undefined;
          } else {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
					else doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
				}
				doc.write(`payload.value = newResult;`);
				doc.write(`return payload;`);
				const fn = doc.compile();
				return (payload, ctx) => fn(shape, payload, ctx);
			};
			let fastpass;
			const isObject$1 = isObject;
			const jit = !globalConfig.jitless;
			const fastEnabled = jit && allowsEval.value;
			const catchall = def.catchall;
			let value;
			inst._zod.parse = (payload, ctx) => {
				value ?? (value = _normalized.value);
				const input = payload.value;
				if (!isObject$1(input)) {
					payload.issues.push({
						expected: "object",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
					if (!fastpass) fastpass = generateFastpass(def.shape);
					payload = fastpass(payload, ctx);
					if (!catchall) return payload;
					return handleCatchall([], input, payload, ctx, value, inst);
				}
				return superParse(payload, ctx);
			};
		});
		function handleUnionResults(results, final, inst, ctx) {
			for (const result of results) if (result.issues.length === 0) {
				final.value = result.value;
				return final;
			}
			const nonaborted = results.filter((r) => !aborted(r));
			if (nonaborted.length === 1) {
				final.value = nonaborted[0].value;
				return nonaborted[0];
			}
			final.issues.push({
				code: "invalid_union",
				input: final.value,
				inst,
				errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			});
			return final;
		}
		const $ZodUnion = /*@__PURE__*/ $constructor("$ZodUnion", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
			defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
			defineLazy(inst._zod, "values", () => {
				if (def.options.every((o) => o._zod.values)) return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
			});
			defineLazy(inst._zod, "pattern", () => {
				if (def.options.every((o) => o._zod.pattern)) {
					const patterns = def.options.map((o) => o._zod.pattern);
					return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
				}
			});
			const first = def.options.length === 1 ? def.options[0]._zod.run : null;
			inst._zod.parse = (payload, ctx) => {
				if (first) return first(payload, ctx);
				let async = false;
				const results = [];
				for (const option of def.options) {
					const result = option._zod.run({
						value: payload.value,
						issues: []
					}, ctx);
					if (result instanceof Promise) {
						results.push(result);
						async = true;
					} else {
						if (result.issues.length === 0) return result;
						results.push(result);
					}
				}
				if (!async) return handleUnionResults(results, payload, inst, ctx);
				return Promise.all(results).then((results) => {
					return handleUnionResults(results, payload, inst, ctx);
				});
			};
		});
		const $ZodIntersection = /*@__PURE__*/ $constructor("$ZodIntersection", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, ctx) => {
				const input = payload.value;
				const left = def.left._zod.run({
					value: input,
					issues: []
				}, ctx);
				const right = def.right._zod.run({
					value: input,
					issues: []
				}, ctx);
				if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
					return handleIntersectionResults(payload, left, right);
				});
				return handleIntersectionResults(payload, left, right);
			};
		});
		function mergeValues(a, b) {
			if (a === b) return {
				valid: true,
				data: a
			};
			if (a instanceof Date && b instanceof Date && +a === +b) return {
				valid: true,
				data: a
			};
			if (isPlainObject(a) && isPlainObject(b)) {
				const bKeys = Object.keys(b);
				const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
				const newObj = {
					...a,
					...b
				};
				for (const key of sharedKeys) {
					const sharedValue = mergeValues(a[key], b[key]);
					if (!sharedValue.valid) return {
						valid: false,
						mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
					};
					newObj[key] = sharedValue.data;
				}
				return {
					valid: true,
					data: newObj
				};
			}
			if (Array.isArray(a) && Array.isArray(b)) {
				if (a.length !== b.length) return {
					valid: false,
					mergeErrorPath: []
				};
				const newArray = [];
				for (let index = 0; index < a.length; index++) {
					const itemA = a[index];
					const itemB = b[index];
					const sharedValue = mergeValues(itemA, itemB);
					if (!sharedValue.valid) return {
						valid: false,
						mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
					};
					newArray.push(sharedValue.data);
				}
				return {
					valid: true,
					data: newArray
				};
			}
			return {
				valid: false,
				mergeErrorPath: []
			};
		}
		function handleIntersectionResults(result, left, right) {
			const unrecKeys = /* @__PURE__ */ new Map();
			let unrecIssue;
			for (const iss of left.issues) if (iss.code === "unrecognized_keys") {
				unrecIssue ?? (unrecIssue = iss);
				for (const k of iss.keys) {
					if (!unrecKeys.has(k)) unrecKeys.set(k, {});
					unrecKeys.get(k).l = true;
				}
			} else result.issues.push(iss);
			for (const iss of right.issues) if (iss.code === "unrecognized_keys") for (const k of iss.keys) {
				if (!unrecKeys.has(k)) unrecKeys.set(k, {});
				unrecKeys.get(k).r = true;
			}
			else result.issues.push(iss);
			const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
			if (bothKeys.length && unrecIssue) result.issues.push({
				...unrecIssue,
				keys: bothKeys
			});
			if (aborted(result)) return result;
			const merged = mergeValues(left.value, right.value);
			if (!merged.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
			result.value = merged.data;
			return result;
		}
		const $ZodRecord = /*@__PURE__*/ $constructor("$ZodRecord", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, ctx) => {
				const input = payload.value;
				if (!isPlainObject(input)) {
					payload.issues.push({
						expected: "record",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				const proms = [];
				const values = def.keyType._zod.values;
				if (values) {
					payload.value = {};
					const recordKeys = /* @__PURE__ */ new Set();
					for (const key of values) if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
						recordKeys.add(typeof key === "number" ? key.toString() : key);
						const keyResult = def.keyType._zod.run({
							value: key,
							issues: []
						}, ctx);
						if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
						if (keyResult.issues.length) {
							payload.issues.push({
								code: "invalid_key",
								origin: "record",
								issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
								input: key,
								path: [key],
								inst
							});
							continue;
						}
						const outKey = keyResult.value;
						const result = def.valueType._zod.run({
							value: input[key],
							issues: []
						}, ctx);
						if (result instanceof Promise) proms.push(result.then((result) => {
							if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
							payload.value[outKey] = result.value;
						}));
						else {
							if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
							payload.value[outKey] = result.value;
						}
					}
					let unrecognized;
					for (const key in input) if (!recordKeys.has(key)) {
						unrecognized = unrecognized ?? [];
						unrecognized.push(key);
					}
					if (unrecognized && unrecognized.length > 0) payload.issues.push({
						code: "unrecognized_keys",
						input,
						inst,
						keys: unrecognized
					});
				} else {
					payload.value = {};
					for (const key of Reflect.ownKeys(input)) {
						if (key === "__proto__") continue;
						if (!Object.prototype.propertyIsEnumerable.call(input, key)) continue;
						let keyResult = def.keyType._zod.run({
							value: key,
							issues: []
						}, ctx);
						if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
						if (typeof key === "string" && number$1.test(key) && keyResult.issues.length) {
							const retryResult = def.keyType._zod.run({
								value: Number(key),
								issues: []
							}, ctx);
							if (retryResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
							if (retryResult.issues.length === 0) keyResult = retryResult;
						}
						if (keyResult.issues.length) {
							if (def.mode === "loose") payload.value[key] = input[key];
							else payload.issues.push({
								code: "invalid_key",
								origin: "record",
								issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
								input: key,
								path: [key],
								inst
							});
							continue;
						}
						const result = def.valueType._zod.run({
							value: input[key],
							issues: []
						}, ctx);
						if (result instanceof Promise) proms.push(result.then((result) => {
							if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
							payload.value[keyResult.value] = result.value;
						}));
						else {
							if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
							payload.value[keyResult.value] = result.value;
						}
					}
				}
				if (proms.length) return Promise.all(proms).then(() => payload);
				return payload;
			};
		});
		const $ZodEnum = /*@__PURE__*/ $constructor("$ZodEnum", (inst, def) => {
			$ZodType.init(inst, def);
			const values = getEnumValues(def.entries);
			const valuesSet = new Set(values);
			inst._zod.values = valuesSet;
			inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (valuesSet.has(input)) return payload;
				payload.issues.push({
					code: "invalid_value",
					values,
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodLiteral = /*@__PURE__*/ $constructor("$ZodLiteral", (inst, def) => {
			$ZodType.init(inst, def);
			if (def.values.length === 0) throw new Error("Cannot create literal schema with no valid values");
			const values = new Set(def.values);
			inst._zod.values = values;
			inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$`);
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (values.has(input)) return payload;
				payload.issues.push({
					code: "invalid_value",
					values: def.values,
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodTransform = /*@__PURE__*/ $constructor("$ZodTransform", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
				const _out = def.transform(payload.value, payload);
				if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
					payload.value = output;
					payload.fallback = true;
					return payload;
				});
				if (_out instanceof Promise) throw new $ZodAsyncError();
				payload.value = _out;
				payload.fallback = true;
				return payload;
			};
		});
		function handleOptionalResult(result, input) {
			if (input === void 0 && (result.issues.length || result.fallback)) return {
				issues: [],
				value: void 0
			};
			return result;
		}
		const $ZodOptional = /*@__PURE__*/ $constructor("$ZodOptional", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			inst._zod.optout = "optional";
			defineLazy(inst._zod, "values", () => {
				return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
			});
			defineLazy(inst._zod, "pattern", () => {
				const pattern = def.innerType._zod.pattern;
				return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				if (def.innerType._zod.optin === "optional") {
					const input = payload.value;
					const result = def.innerType._zod.run(payload, ctx);
					if (result instanceof Promise) return result.then((r) => handleOptionalResult(r, input));
					return handleOptionalResult(result, input);
				}
				if (payload.value === void 0) return payload;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodExactOptional = /*@__PURE__*/ $constructor("$ZodExactOptional", (inst, def) => {
			$ZodOptional.init(inst, def);
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
			inst._zod.parse = (payload, ctx) => {
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodNullable = /*@__PURE__*/ $constructor("$ZodNullable", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
			defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
			defineLazy(inst._zod, "pattern", () => {
				const pattern = def.innerType._zod.pattern;
				return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
			});
			defineLazy(inst._zod, "values", () => {
				return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				if (payload.value === null) return payload;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodDefault = /*@__PURE__*/ $constructor("$ZodDefault", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				if (payload.value === void 0) {
					payload.value = def.defaultValue;
					/**
					* $ZodDefault returns the default value immediately in forward direction.
					* It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
					return payload;
				}
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
				return handleDefaultResult(result, def);
			};
		});
		function handleDefaultResult(payload, def) {
			if (payload.value === void 0) payload.value = def.defaultValue;
			return payload;
		}
		const $ZodPrefault = /*@__PURE__*/ $constructor("$ZodPrefault", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				if (payload.value === void 0) payload.value = def.defaultValue;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodNonOptional = /*@__PURE__*/ $constructor("$ZodNonOptional", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "values", () => {
				const v = def.innerType._zod.values;
				return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
				return handleNonOptionalResult(result, inst);
			};
		});
		function handleNonOptionalResult(payload, inst) {
			if (!payload.issues.length && payload.value === void 0) payload.issues.push({
				code: "invalid_type",
				expected: "nonoptional",
				input: payload.value,
				inst
			});
			return payload;
		}
		const $ZodCatch = /*@__PURE__*/ $constructor("$ZodCatch", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => {
					payload.value = result.value;
					if (result.issues.length) {
						payload.value = def.catchValue({
							...payload,
							error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
							input: payload.value
						});
						payload.issues = [];
						payload.fallback = true;
					}
					return payload;
				});
				payload.value = result.value;
				if (result.issues.length) {
					payload.value = def.catchValue({
						...payload,
						error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
						input: payload.value
					});
					payload.issues = [];
					payload.fallback = true;
				}
				return payload;
			};
		});
		const $ZodPipe = /*@__PURE__*/ $constructor("$ZodPipe", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "values", () => def.in._zod.values);
			defineLazy(inst._zod, "optin", () => def.in._zod.optin);
			defineLazy(inst._zod, "optout", () => def.out._zod.optout);
			defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") {
					const right = def.out._zod.run(payload, ctx);
					if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
					return handlePipeResult(right, def.in, ctx);
				}
				const left = def.in._zod.run(payload, ctx);
				if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
				return handlePipeResult(left, def.out, ctx);
			};
		});
		function handlePipeResult(left, next, ctx) {
			if (left.issues.length) {
				left.aborted = true;
				return left;
			}
			return next._zod.run({
				value: left.value,
				issues: left.issues,
				fallback: left.fallback
			}, ctx);
		}
		const $ZodReadonly = /*@__PURE__*/ $constructor("$ZodReadonly", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
			defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then(handleReadonlyResult);
				return handleReadonlyResult(result);
			};
		});
		function handleReadonlyResult(payload) {
			payload.value = Object.freeze(payload.value);
			return payload;
		}
		const $ZodLazy = /*@__PURE__*/ $constructor("$ZodLazy", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "innerType", () => {
				const d = def;
				if (!d._cachedInner) d._cachedInner = def.getter();
				return d._cachedInner;
			});
			defineLazy(inst._zod, "pattern", () => inst._zod.innerType?._zod?.pattern);
			defineLazy(inst._zod, "propValues", () => inst._zod.innerType?._zod?.propValues);
			defineLazy(inst._zod, "optin", () => inst._zod.innerType?._zod?.optin ?? void 0);
			defineLazy(inst._zod, "optout", () => inst._zod.innerType?._zod?.optout ?? void 0);
			inst._zod.parse = (payload, ctx) => {
				return inst._zod.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodCustom = /*@__PURE__*/ $constructor("$ZodCustom", (inst, def) => {
			$ZodCheck.init(inst, def);
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, _) => {
				return payload;
			};
			inst._zod.check = (payload) => {
				const input = payload.value;
				const r = def.fn(input);
				if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
				handleRefineResult(r, payload, input, inst);
			};
		});
		function handleRefineResult(result, payload, input, inst) {
			if (!result) {
				const _iss = {
					code: "custom",
					input,
					inst,
					path: [...inst._zod.def.path ?? []],
					continue: !inst._zod.def.abort
				};
				if (inst._zod.def.params) _iss.params = inst._zod.def.params;
				payload.issues.push(issue(_iss));
			}
		}
		//#endregion
		//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/registries.js
		var _a;
		var $ZodRegistry = class {
			constructor() {
				this._map = /* @__PURE__ */ new WeakMap();
				this._idmap = /* @__PURE__ */ new Map();
			}
			add(schema, ..._meta) {
				const meta = _meta[0];
				this._map.set(schema, meta);
				if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
				return this;
			}
			clear() {
				this._map = /* @__PURE__ */ new WeakMap();
				this._idmap = /* @__PURE__ */ new Map();
				return this;
			}
			remove(schema) {
				const meta = this._map.get(schema);
				if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
				this._map.delete(schema);
				return this;
			}
			get(schema) {
				const p = schema._zod.parent;
				if (p) {
					const pm = { ...this.get(p) ?? {} };
					delete pm.id;
					const f = {
						...pm,
						...this._map.get(schema)
					};
					return Object.keys(f).length ? f : void 0;
				}
				return this._map.get(schema);
			}
			has(schema) {
				return this._map.has(schema);
			}
		};
		function registry() {
			return new $ZodRegistry();
		}
		(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
		const globalRegistry = globalThis.__zod_globalRegistry;
		//#endregion
		//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/api.js
		// @__NO_SIDE_EFFECTS__
		function _string(Class, params) {
			return new Class({
				type: "string",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _email(Class, params) {
			return new Class({
				type: "string",
				format: "email",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _guid(Class, params) {
			return new Class({
				type: "string",
				format: "guid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuid(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv4(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v4",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv6(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v6",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv7(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v7",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _url(Class, params) {
			return new Class({
				type: "string",
				format: "url",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _emoji(Class, params) {
			return new Class({
				type: "string",
				format: "emoji",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _nanoid(Class, params) {
			return new Class({
				type: "string",
				format: "nanoid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link _cuid2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		// @__NO_SIDE_EFFECTS__
		function _cuid(Class, params) {
			return new Class({
				type: "string",
				format: "cuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cuid2(Class, params) {
			return new Class({
				type: "string",
				format: "cuid2",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ulid(Class, params) {
			return new Class({
				type: "string",
				format: "ulid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _xid(Class, params) {
			return new Class({
				type: "string",
				format: "xid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ksuid(Class, params) {
			return new Class({
				type: "string",
				format: "ksuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv4(Class, params) {
			return new Class({
				type: "string",
				format: "ipv4",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv6(Class, params) {
			return new Class({
				type: "string",
				format: "ipv6",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv4(Class, params) {
			return new Class({
				type: "string",
				format: "cidrv4",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv6(Class, params) {
			return new Class({
				type: "string",
				format: "cidrv6",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _base64(Class, params) {
			return new Class({
				type: "string",
				format: "base64",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _base64url(Class, params) {
			return new Class({
				type: "string",
				format: "base64url",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _e164(Class, params) {
			return new Class({
				type: "string",
				format: "e164",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _jwt(Class, params) {
			return new Class({
				type: "string",
				format: "jwt",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDateTime(Class, params) {
			return new Class({
				type: "string",
				format: "datetime",
				check: "string_format",
				offset: false,
				local: false,
				precision: null,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDate(Class, params) {
			return new Class({
				type: "string",
				format: "date",
				check: "string_format",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoTime(Class, params) {
			return new Class({
				type: "string",
				format: "time",
				check: "string_format",
				precision: null,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDuration(Class, params) {
			return new Class({
				type: "string",
				format: "duration",
				check: "string_format",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _number(Class, params) {
			return new Class({
				type: "number",
				checks: [],
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _int(Class, params) {
			return new Class({
				type: "number",
				check: "number_format",
				abort: false,
				format: "safeint",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _boolean(Class, params) {
			return new Class({
				type: "boolean",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _undefined$1(Class, params) {
			return new Class({
				type: "undefined",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _unknown(Class) {
			return new Class({ type: "unknown" });
		}
		// @__NO_SIDE_EFFECTS__
		function _never(Class, params) {
			return new Class({
				type: "never",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _void$1(Class, params) {
			return new Class({
				type: "void",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lt(value, params) {
			return new $ZodCheckLessThan({
				check: "less_than",
				...normalizeParams(params),
				value,
				inclusive: false
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lte(value, params) {
			return new $ZodCheckLessThan({
				check: "less_than",
				...normalizeParams(params),
				value,
				inclusive: true
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _gt(value, params) {
			return new $ZodCheckGreaterThan({
				check: "greater_than",
				...normalizeParams(params),
				value,
				inclusive: false
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _gte(value, params) {
			return new $ZodCheckGreaterThan({
				check: "greater_than",
				...normalizeParams(params),
				value,
				inclusive: true
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _multipleOf(value, params) {
			return new $ZodCheckMultipleOf({
				check: "multiple_of",
				...normalizeParams(params),
				value
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _maxLength(maximum, params) {
			return new $ZodCheckMaxLength({
				check: "max_length",
				...normalizeParams(params),
				maximum
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _minLength(minimum, params) {
			return new $ZodCheckMinLength({
				check: "min_length",
				...normalizeParams(params),
				minimum
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _length(length, params) {
			return new $ZodCheckLengthEquals({
				check: "length_equals",
				...normalizeParams(params),
				length
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _regex(pattern, params) {
			return new $ZodCheckRegex({
				check: "string_format",
				format: "regex",
				...normalizeParams(params),
				pattern
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lowercase(params) {
			return new $ZodCheckLowerCase({
				check: "string_format",
				format: "lowercase",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uppercase(params) {
			return new $ZodCheckUpperCase({
				check: "string_format",
				format: "uppercase",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _includes(includes, params) {
			return new $ZodCheckIncludes({
				check: "string_format",
				format: "includes",
				...normalizeParams(params),
				includes
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _startsWith(prefix, params) {
			return new $ZodCheckStartsWith({
				check: "string_format",
				format: "starts_with",
				...normalizeParams(params),
				prefix
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _endsWith(suffix, params) {
			return new $ZodCheckEndsWith({
				check: "string_format",
				format: "ends_with",
				...normalizeParams(params),
				suffix
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _overwrite(tx) {
			return new $ZodCheckOverwrite({
				check: "overwrite",
				tx
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _normalize(form) {
			return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
		}
		// @__NO_SIDE_EFFECTS__
		function _trim() {
			return /* @__PURE__ */ _overwrite((input) => input.trim());
		}
		// @__NO_SIDE_EFFECTS__
		function _toLowerCase() {
			return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
		}
		// @__NO_SIDE_EFFECTS__
		function _toUpperCase() {
			return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
		}
		// @__NO_SIDE_EFFECTS__
		function _slugify() {
			return /* @__PURE__ */ _overwrite((input) => slugify(input));
		}
		// @__NO_SIDE_EFFECTS__
		function _array(Class, element, params) {
			return new Class({
				type: "array",
				element,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _refine(Class, fn, _params) {
			return new Class({
				type: "custom",
				check: "custom",
				fn,
				...normalizeParams(_params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _superRefine(fn, params) {
			const ch = /* @__PURE__ */ _check((payload) => {
				payload.addIssue = (issue$2) => {
					if (typeof issue$2 === "string") payload.issues.push(issue(issue$2, payload.value, ch._zod.def));
					else {
						const _issue = issue$2;
						if (_issue.fatal) _issue.continue = false;
						_issue.code ?? (_issue.code = "custom");
						_issue.input ?? (_issue.input = payload.value);
						_issue.inst ?? (_issue.inst = ch);
						_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
						payload.issues.push(issue(_issue));
					}
				};
				return fn(payload.value, payload);
			}, params);
			return ch;
		}
		// @__NO_SIDE_EFFECTS__
		function _check(fn, params) {
			const ch = new $ZodCheck({
				check: "custom",
				...normalizeParams(params)
			});
			ch._zod.check = fn;
			return ch;
		}
		//#endregion
		//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/to-json-schema.js
		function initializeContext(params) {
			let target = params?.target ?? "draft-2020-12";
			if (target === "draft-4") target = "draft-04";
			if (target === "draft-7") target = "draft-07";
			return {
				processors: params.processors ?? {},
				metadataRegistry: params?.metadata ?? globalRegistry,
				target,
				unrepresentable: params?.unrepresentable ?? "throw",
				override: params?.override ?? (() => {}),
				io: params?.io ?? "output",
				counter: 0,
				seen: /* @__PURE__ */ new Map(),
				cycles: params?.cycles ?? "ref",
				reused: params?.reused ?? "inline",
				external: params?.external ?? void 0
			};
		}
		function process(schema, ctx, _params = {
			path: [],
			schemaPath: []
		}) {
			var _a;
			const def = schema._zod.def;
			const seen = ctx.seen.get(schema);
			if (seen) {
				seen.count++;
				if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
				return seen.schema;
			}
			const result = {
				schema: {},
				count: 1,
				cycle: void 0,
				path: _params.path
			};
			ctx.seen.set(schema, result);
			const overrideSchema = schema._zod.toJSONSchema?.();
			if (overrideSchema) result.schema = overrideSchema;
			else {
				const params = {
					..._params,
					schemaPath: [..._params.schemaPath, schema],
					path: _params.path
				};
				if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
				else {
					const _json = result.schema;
					const processor = ctx.processors[def.type];
					if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
					processor(schema, ctx, _json, params);
				}
				const parent = schema._zod.parent;
				if (parent) {
					if (!result.ref) result.ref = parent;
					process(parent, ctx, params);
					ctx.seen.get(parent).isParent = true;
				}
			}
			const meta = ctx.metadataRegistry.get(schema);
			if (meta) Object.assign(result.schema, meta);
			if (ctx.io === "input" && isTransforming(schema)) {
				delete result.schema.examples;
				delete result.schema.default;
			}
			if (ctx.io === "input" && "_prefault" in result.schema) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
			delete result.schema._prefault;
			return ctx.seen.get(schema).schema;
		}
		function extractDefs(ctx, schema) {
			const root = ctx.seen.get(schema);
			if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
			const idToSchema = /* @__PURE__ */ new Map();
			for (const entry of ctx.seen.entries()) {
				const id = ctx.metadataRegistry.get(entry[0])?.id;
				if (id) {
					const existing = idToSchema.get(id);
					if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
					idToSchema.set(id, entry[0]);
				}
			}
			const makeURI = (entry) => {
				const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
				if (ctx.external) {
					const externalId = ctx.external.registry.get(entry[0])?.id;
					const uriGenerator = ctx.external.uri ?? ((id) => id);
					if (externalId) return { ref: uriGenerator(externalId) };
					const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
					entry[1].defId = id;
					return {
						defId: id,
						ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}`
					};
				}
				if (entry[1] === root) return { ref: "#" };
				const defUriPrefix = `#/${defsSegment}/`;
				const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
				return {
					defId,
					ref: defUriPrefix + defId
				};
			};
			const extractToDef = (entry) => {
				if (entry[1].schema.$ref) return;
				const seen = entry[1];
				const { ref, defId } = makeURI(entry);
				seen.def = { ...seen.schema };
				if (defId) seen.defId = defId;
				const schema = seen.schema;
				for (const key in schema) delete schema[key];
				schema.$ref = ref;
			};
			if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
			}
			for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (schema === entry[0]) {
					extractToDef(entry);
					continue;
				}
				if (ctx.external) {
					const ext = ctx.external.registry.get(entry[0])?.id;
					if (schema !== entry[0] && ext) {
						extractToDef(entry);
						continue;
					}
				}
				if (ctx.metadataRegistry.get(entry[0])?.id) {
					extractToDef(entry);
					continue;
				}
				if (seen.cycle) {
					extractToDef(entry);
					continue;
				}
				if (seen.count > 1) {
					if (ctx.reused === "ref") {
						extractToDef(entry);
						continue;
					}
				}
			}
		}
		function finalize(ctx, schema) {
			const root = ctx.seen.get(schema);
			if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
			const flattenRef = (zodSchema) => {
				const seen = ctx.seen.get(zodSchema);
				if (seen.ref === null) return;
				const schema = seen.def ?? seen.schema;
				const _cached = { ...schema };
				const ref = seen.ref;
				seen.ref = null;
				if (ref) {
					flattenRef(ref);
					const refSeen = ctx.seen.get(ref);
					const refSchema = refSeen.schema;
					if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
						schema.allOf = schema.allOf ?? [];
						schema.allOf.push(refSchema);
					} else Object.assign(schema, refSchema);
					Object.assign(schema, _cached);
					if (zodSchema._zod.parent === ref) for (const key in schema) {
						if (key === "$ref" || key === "allOf") continue;
						if (!(key in _cached)) delete schema[key];
					}
					if (refSchema.$ref && refSeen.def) for (const key in schema) {
						if (key === "$ref" || key === "allOf") continue;
						if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) delete schema[key];
					}
				}
				const parent = zodSchema._zod.parent;
				if (parent && parent !== ref) {
					flattenRef(parent);
					const parentSeen = ctx.seen.get(parent);
					if (parentSeen?.schema.$ref) {
						schema.$ref = parentSeen.schema.$ref;
						if (parentSeen.def) for (const key in schema) {
							if (key === "$ref" || key === "allOf") continue;
							if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) delete schema[key];
						}
					}
				}
				ctx.override({
					zodSchema,
					jsonSchema: schema,
					path: seen.path ?? []
				});
			};
			for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
			const result = {};
			if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
			else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
			else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
			else if (ctx.target === "openapi-3.0") {}
			if (ctx.external?.uri) {
				const id = ctx.external.registry.get(schema)?.id;
				if (!id) throw new Error("Schema is missing an `id` property");
				result.$id = ctx.external.uri(id);
			}
			Object.assign(result, root.def ?? root.schema);
			const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
			if (rootMetaId !== void 0 && result.id === rootMetaId) delete result.id;
			const defs = ctx.external?.defs ?? {};
			for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (seen.def && seen.defId) {
					if (seen.def.id === seen.defId) delete seen.def.id;
					defs[seen.defId] = seen.def;
				}
			}
			if (ctx.external) {} else if (Object.keys(defs).length > 0) if (ctx.target === "draft-2020-12") result.$defs = defs;
			else result.definitions = defs;
			try {
				const finalized = JSON.parse(JSON.stringify(result));
				Object.defineProperty(finalized, "~standard", {
					value: {
						...schema["~standard"],
						jsonSchema: {
							input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
							output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
						}
					},
					enumerable: false,
					writable: false
				});
				return finalized;
			} catch (_err) {
				throw new Error("Error converting schema to JSON.");
			}
		}
		function isTransforming(_schema, _ctx) {
			const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
			if (ctx.seen.has(_schema)) return false;
			ctx.seen.add(_schema);
			const def = _schema._zod.def;
			if (def.type === "transform") return true;
			if (def.type === "array") return isTransforming(def.element, ctx);
			if (def.type === "set") return isTransforming(def.valueType, ctx);
			if (def.type === "lazy") return isTransforming(def.getter(), ctx);
			if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") return isTransforming(def.innerType, ctx);
			if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
			if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
			if (def.type === "pipe") {
				if (_schema._zod.traits.has("$ZodCodec")) return true;
				return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
			}
			if (def.type === "object") {
				for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
				return false;
			}
			if (def.type === "union") {
				for (const option of def.options) if (isTransforming(option, ctx)) return true;
				return false;
			}
			if (def.type === "tuple") {
				for (const item of def.items) if (isTransforming(item, ctx)) return true;
				if (def.rest && isTransforming(def.rest, ctx)) return true;
				return false;
			}
			return false;
		}
		/**
		* Creates a toJSONSchema method for a schema instance.
		* This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
		*/
		const createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
			const ctx = initializeContext({
				...params,
				processors
			});
			process(schema, ctx);
			extractDefs(ctx, schema);
			return finalize(ctx, schema);
		};
		const createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
			const { libraryOptions, target } = params ?? {};
			const ctx = initializeContext({
				...libraryOptions ?? {},
				target,
				io,
				processors
			});
			process(schema, ctx);
			extractDefs(ctx, schema);
			return finalize(ctx, schema);
		};
		//#endregion
		//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/json-schema-processors.js
		const formatMap = {
			guid: "uuid",
			url: "uri",
			datetime: "date-time",
			json_string: "json-string",
			regex: ""
		};
		const stringProcessor = (schema, ctx, _json, _params) => {
			const json = _json;
			json.type = "string";
			const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
			if (typeof minimum === "number") json.minLength = minimum;
			if (typeof maximum === "number") json.maxLength = maximum;
			if (format) {
				json.format = formatMap[format] ?? format;
				if (json.format === "") delete json.format;
				if (format === "time") delete json.format;
			}
			if (contentEncoding) json.contentEncoding = contentEncoding;
			if (patterns && patterns.size > 0) {
				const regexes = [...patterns];
				if (regexes.length === 1) json.pattern = regexes[0].source;
				else if (regexes.length > 1) json.allOf = [...regexes.map((regex) => ({
					...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
					pattern: regex.source
				}))];
			}
		};
		const numberProcessor = (schema, ctx, _json, _params) => {
			const json = _json;
			const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
			if (typeof format === "string" && format.includes("int")) json.type = "integer";
			else json.type = "number";
			const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
			const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
			const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
			if (exMin) if (legacy) {
				json.minimum = exclusiveMinimum;
				json.exclusiveMinimum = true;
			} else json.exclusiveMinimum = exclusiveMinimum;
			else if (typeof minimum === "number") json.minimum = minimum;
			if (exMax) if (legacy) {
				json.maximum = exclusiveMaximum;
				json.exclusiveMaximum = true;
			} else json.exclusiveMaximum = exclusiveMaximum;
			else if (typeof maximum === "number") json.maximum = maximum;
			if (typeof multipleOf === "number") json.multipleOf = multipleOf;
		};
		const booleanProcessor = (_schema, _ctx, json, _params) => {
			json.type = "boolean";
		};
		const undefinedProcessor = (_schema, ctx, _json, _params) => {
			if (ctx.unrepresentable === "throw") throw new Error("Undefined cannot be represented in JSON Schema");
		};
		const voidProcessor = (_schema, ctx, _json, _params) => {
			if (ctx.unrepresentable === "throw") throw new Error("Void cannot be represented in JSON Schema");
		};
		const neverProcessor = (_schema, _ctx, json, _params) => {
			json.not = {};
		};
		const enumProcessor = (schema, _ctx, json, _params) => {
			const def = schema._zod.def;
			const values = getEnumValues(def.entries);
			if (values.every((v) => typeof v === "number")) json.type = "number";
			if (values.every((v) => typeof v === "string")) json.type = "string";
			json.enum = values;
		};
		const literalProcessor = (schema, ctx, json, _params) => {
			const def = schema._zod.def;
			const vals = [];
			for (const val of def.values) if (val === void 0) {
				if (ctx.unrepresentable === "throw") throw new Error("Literal `undefined` cannot be represented in JSON Schema");
			} else if (typeof val === "bigint") if (ctx.unrepresentable === "throw") throw new Error("BigInt literals cannot be represented in JSON Schema");
			else vals.push(Number(val));
			else vals.push(val);
			if (vals.length === 0) {} else if (vals.length === 1) {
				const val = vals[0];
				json.type = val === null ? "null" : typeof val;
				if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") json.enum = [val];
				else json.const = val;
			} else {
				if (vals.every((v) => typeof v === "number")) json.type = "number";
				if (vals.every((v) => typeof v === "string")) json.type = "string";
				if (vals.every((v) => typeof v === "boolean")) json.type = "boolean";
				if (vals.every((v) => v === null)) json.type = "null";
				json.enum = vals;
			}
		};
		const customProcessor = (_schema, ctx, _json, _params) => {
			if (ctx.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
		};
		const transformProcessor = (_schema, ctx, _json, _params) => {
			if (ctx.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
		};
		const arrayProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const def = schema._zod.def;
			const { minimum, maximum } = schema._zod.bag;
			if (typeof minimum === "number") json.minItems = minimum;
			if (typeof maximum === "number") json.maxItems = maximum;
			json.type = "array";
			json.items = process(def.element, ctx, {
				...params,
				path: [...params.path, "items"]
			});
		};
		const objectProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const def = schema._zod.def;
			json.type = "object";
			json.properties = {};
			const shape = def.shape;
			for (const key in shape) json.properties[key] = process(shape[key], ctx, {
				...params,
				path: [
					...params.path,
					"properties",
					key
				]
			});
			const allKeys = new Set(Object.keys(shape));
			const requiredKeys = new Set([...allKeys].filter((key) => {
				const v = def.shape[key]._zod;
				if (ctx.io === "input") return v.optin === void 0;
				else return v.optout === void 0;
			}));
			if (requiredKeys.size > 0) json.required = Array.from(requiredKeys);
			if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
			else if (!def.catchall) {
				if (ctx.io === "output") json.additionalProperties = false;
			} else if (def.catchall) json.additionalProperties = process(def.catchall, ctx, {
				...params,
				path: [...params.path, "additionalProperties"]
			});
		};
		const unionProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const isExclusive = def.inclusive === false;
			const options = def.options.map((x, i) => process(x, ctx, {
				...params,
				path: [
					...params.path,
					isExclusive ? "oneOf" : "anyOf",
					i
				]
			}));
			if (isExclusive) json.oneOf = options;
			else json.anyOf = options;
		};
		const intersectionProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const a = process(def.left, ctx, {
				...params,
				path: [
					...params.path,
					"allOf",
					0
				]
			});
			const b = process(def.right, ctx, {
				...params,
				path: [
					...params.path,
					"allOf",
					1
				]
			});
			const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
			json.allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
		};
		const recordProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const def = schema._zod.def;
			json.type = "object";
			const keyType = def.keyType;
			const patterns = keyType._zod.bag?.patterns;
			if (def.mode === "loose" && patterns && patterns.size > 0) {
				const valueSchema = process(def.valueType, ctx, {
					...params,
					path: [
						...params.path,
						"patternProperties",
						"*"
					]
				});
				json.patternProperties = {};
				for (const pattern of patterns) json.patternProperties[pattern.source] = valueSchema;
			} else {
				if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") json.propertyNames = process(def.keyType, ctx, {
					...params,
					path: [...params.path, "propertyNames"]
				});
				json.additionalProperties = process(def.valueType, ctx, {
					...params,
					path: [...params.path, "additionalProperties"]
				});
			}
			const keyValues = keyType._zod.values;
			if (keyValues) {
				const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
				if (validKeyValues.length > 0) json.required = validKeyValues;
			}
		};
		const nullableProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const inner = process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			if (ctx.target === "openapi-3.0") {
				seen.ref = def.innerType;
				json.nullable = true;
			} else json.anyOf = [inner, { type: "null" }];
		};
		const nonoptionalProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
		};
		const defaultProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			json.default = JSON.parse(JSON.stringify(def.defaultValue));
		};
		const prefaultProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			if (ctx.io === "input") json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
		};
		const catchProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			let catchValue;
			try {
				catchValue = def.catchValue(void 0);
			} catch {
				throw new Error("Dynamic catch values are not supported in JSON Schema");
			}
			json.default = catchValue;
		};
		const pipeProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			const inIsTransform = def.in._zod.traits.has("$ZodTransform");
			const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
			process(innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = innerType;
		};
		const readonlyProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			json.readOnly = true;
		};
		const optionalProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
		};
		const lazyProcessor = (schema, ctx, _json, params) => {
			const innerType = schema._zod.innerType;
			process(innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = innerType;
		};
		//#endregion
		//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/iso.js
		const ZodISODateTime = /*@__PURE__*/ $constructor("ZodISODateTime", (inst, def) => {
			$ZodISODateTime.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function datetime(params) {
			return /* @__PURE__ */ _isoDateTime(ZodISODateTime, params);
		}
		const ZodISODate = /*@__PURE__*/ $constructor("ZodISODate", (inst, def) => {
			$ZodISODate.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function date(params) {
			return /* @__PURE__ */ _isoDate(ZodISODate, params);
		}
		const ZodISOTime = /*@__PURE__*/ $constructor("ZodISOTime", (inst, def) => {
			$ZodISOTime.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function time(params) {
			return /* @__PURE__ */ _isoTime(ZodISOTime, params);
		}
		const ZodISODuration = /*@__PURE__*/ $constructor("ZodISODuration", (inst, def) => {
			$ZodISODuration.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function duration(params) {
			return /* @__PURE__ */ _isoDuration(ZodISODuration, params);
		}
		//#endregion
		//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/errors.js
		const initializer = (inst, issues) => {
			$ZodError.init(inst, issues);
			inst.name = "ZodError";
			Object.defineProperties(inst, {
				format: { value: (mapper) => formatError(inst, mapper) },
				flatten: { value: (mapper) => flattenError(inst, mapper) },
				addIssue: { value: (issue) => {
					inst.issues.push(issue);
					inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
				} },
				addIssues: { value: (issues) => {
					inst.issues.push(...issues);
					inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
				} },
				isEmpty: { get() {
					return inst.issues.length === 0;
				} }
			});
		};
		const ZodRealError = /*@__PURE__*/ $constructor("ZodError", initializer, { Parent: Error });
		//#endregion
		//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/parse.js
		const parse = /* @__PURE__ */ _parse(ZodRealError);
		const parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
		const safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
		const safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
		const encode = /* @__PURE__ */ _encode(ZodRealError);
		const decode = /* @__PURE__ */ _decode(ZodRealError);
		const encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
		const decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
		const safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
		const safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
		const safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
		const safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
		//#endregion
		//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/schemas.js
		const _installedGroups = /* @__PURE__ */ new WeakMap();
		function _installLazyMethods(inst, group, methods) {
			const proto = Object.getPrototypeOf(inst);
			let installed = _installedGroups.get(proto);
			if (!installed) {
				installed = /* @__PURE__ */ new Set();
				_installedGroups.set(proto, installed);
			}
			if (installed.has(group)) return;
			installed.add(group);
			for (const key in methods) {
				const fn = methods[key];
				Object.defineProperty(proto, key, {
					configurable: true,
					enumerable: false,
					get() {
						const bound = fn.bind(this);
						Object.defineProperty(this, key, {
							configurable: true,
							writable: true,
							enumerable: true,
							value: bound
						});
						return bound;
					},
					set(v) {
						Object.defineProperty(this, key, {
							configurable: true,
							writable: true,
							enumerable: true,
							value: v
						});
					}
				});
			}
		}
		const ZodType = /*@__PURE__*/ $constructor("ZodType", (inst, def) => {
			$ZodType.init(inst, def);
			Object.assign(inst["~standard"], { jsonSchema: {
				input: createStandardJSONSchemaMethod(inst, "input"),
				output: createStandardJSONSchemaMethod(inst, "output")
			} });
			inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
			inst.def = def;
			inst.type = def.type;
			Object.defineProperty(inst, "_def", { value: def });
			inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
			inst.safeParse = (data, params) => safeParse(inst, data, params);
			inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
			inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
			inst.spa = inst.safeParseAsync;
			inst.encode = (data, params) => encode(inst, data, params);
			inst.decode = (data, params) => decode(inst, data, params);
			inst.encodeAsync = async (data, params) => encodeAsync(inst, data, params);
			inst.decodeAsync = async (data, params) => decodeAsync(inst, data, params);
			inst.safeEncode = (data, params) => safeEncode(inst, data, params);
			inst.safeDecode = (data, params) => safeDecode(inst, data, params);
			inst.safeEncodeAsync = async (data, params) => safeEncodeAsync(inst, data, params);
			inst.safeDecodeAsync = async (data, params) => safeDecodeAsync(inst, data, params);
			_installLazyMethods(inst, "ZodType", {
				check(...chks) {
					const def = this.def;
					return this.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...chks.map((ch) => typeof ch === "function" ? { _zod: {
						check: ch,
						def: { check: "custom" },
						onattach: []
					} } : ch)] }), { parent: true });
				},
				with(...chks) {
					return this.check(...chks);
				},
				clone(def, params) {
					return clone(this, def, params);
				},
				brand() {
					return this;
				},
				register(reg, meta) {
					reg.add(this, meta);
					return this;
				},
				refine(check, params) {
					return this.check(refine(check, params));
				},
				superRefine(refinement, params) {
					return this.check(superRefine(refinement, params));
				},
				overwrite(fn) {
					return this.check(/* @__PURE__ */ _overwrite(fn));
				},
				optional() {
					return optional(this);
				},
				exactOptional() {
					return exactOptional(this);
				},
				nullable() {
					return nullable(this);
				},
				nullish() {
					return optional(nullable(this));
				},
				nonoptional(params) {
					return nonoptional(this, params);
				},
				array() {
					return array(this);
				},
				or(arg) {
					return union([this, arg]);
				},
				and(arg) {
					return intersection(this, arg);
				},
				transform(tx) {
					return pipe(this, transform(tx));
				},
				default(d) {
					return _default(this, d);
				},
				prefault(d) {
					return prefault(this, d);
				},
				catch(params) {
					return _catch(this, params);
				},
				pipe(target) {
					return pipe(this, target);
				},
				readonly() {
					return readonly(this);
				},
				describe(description) {
					const cl = this.clone();
					globalRegistry.add(cl, { description });
					return cl;
				},
				meta(...args) {
					if (args.length === 0) return globalRegistry.get(this);
					const cl = this.clone();
					globalRegistry.add(cl, args[0]);
					return cl;
				},
				isOptional() {
					return this.safeParse(void 0).success;
				},
				isNullable() {
					return this.safeParse(null).success;
				},
				apply(fn) {
					return fn(this);
				}
			});
			Object.defineProperty(inst, "description", {
				get() {
					return globalRegistry.get(inst)?.description;
				},
				configurable: true
			});
			return inst;
		});
		/** @internal */
		const _ZodString = /*@__PURE__*/ $constructor("_ZodString", (inst, def) => {
			$ZodString.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
			const bag = inst._zod.bag;
			inst.format = bag.format ?? null;
			inst.minLength = bag.minimum ?? null;
			inst.maxLength = bag.maximum ?? null;
			_installLazyMethods(inst, "_ZodString", {
				regex(...args) {
					return this.check(/* @__PURE__ */ _regex(...args));
				},
				includes(...args) {
					return this.check(/* @__PURE__ */ _includes(...args));
				},
				startsWith(...args) {
					return this.check(/* @__PURE__ */ _startsWith(...args));
				},
				endsWith(...args) {
					return this.check(/* @__PURE__ */ _endsWith(...args));
				},
				min(...args) {
					return this.check(/* @__PURE__ */ _minLength(...args));
				},
				max(...args) {
					return this.check(/* @__PURE__ */ _maxLength(...args));
				},
				length(...args) {
					return this.check(/* @__PURE__ */ _length(...args));
				},
				nonempty(...args) {
					return this.check(/* @__PURE__ */ _minLength(1, ...args));
				},
				lowercase(params) {
					return this.check(/* @__PURE__ */ _lowercase(params));
				},
				uppercase(params) {
					return this.check(/* @__PURE__ */ _uppercase(params));
				},
				trim() {
					return this.check(/* @__PURE__ */ _trim());
				},
				normalize(...args) {
					return this.check(/* @__PURE__ */ _normalize(...args));
				},
				toLowerCase() {
					return this.check(/* @__PURE__ */ _toLowerCase());
				},
				toUpperCase() {
					return this.check(/* @__PURE__ */ _toUpperCase());
				},
				slugify() {
					return this.check(/* @__PURE__ */ _slugify());
				}
			});
		});
		const ZodString = /*@__PURE__*/ $constructor("ZodString", (inst, def) => {
			$ZodString.init(inst, def);
			_ZodString.init(inst, def);
			inst.email = (params) => inst.check(/* @__PURE__ */ _email(ZodEmail, params));
			inst.url = (params) => inst.check(/* @__PURE__ */ _url(ZodURL, params));
			inst.jwt = (params) => inst.check(/* @__PURE__ */ _jwt(ZodJWT, params));
			inst.emoji = (params) => inst.check(/* @__PURE__ */ _emoji(ZodEmoji, params));
			inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
			inst.uuid = (params) => inst.check(/* @__PURE__ */ _uuid(ZodUUID, params));
			inst.uuidv4 = (params) => inst.check(/* @__PURE__ */ _uuidv4(ZodUUID, params));
			inst.uuidv6 = (params) => inst.check(/* @__PURE__ */ _uuidv6(ZodUUID, params));
			inst.uuidv7 = (params) => inst.check(/* @__PURE__ */ _uuidv7(ZodUUID, params));
			inst.nanoid = (params) => inst.check(/* @__PURE__ */ _nanoid(ZodNanoID, params));
			inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
			inst.cuid = (params) => inst.check(/* @__PURE__ */ _cuid(ZodCUID, params));
			inst.cuid2 = (params) => inst.check(/* @__PURE__ */ _cuid2(ZodCUID2, params));
			inst.ulid = (params) => inst.check(/* @__PURE__ */ _ulid(ZodULID, params));
			inst.base64 = (params) => inst.check(/* @__PURE__ */ _base64(ZodBase64, params));
			inst.base64url = (params) => inst.check(/* @__PURE__ */ _base64url(ZodBase64URL, params));
			inst.xid = (params) => inst.check(/* @__PURE__ */ _xid(ZodXID, params));
			inst.ksuid = (params) => inst.check(/* @__PURE__ */ _ksuid(ZodKSUID, params));
			inst.ipv4 = (params) => inst.check(/* @__PURE__ */ _ipv4(ZodIPv4, params));
			inst.ipv6 = (params) => inst.check(/* @__PURE__ */ _ipv6(ZodIPv6, params));
			inst.cidrv4 = (params) => inst.check(/* @__PURE__ */ _cidrv4(ZodCIDRv4, params));
			inst.cidrv6 = (params) => inst.check(/* @__PURE__ */ _cidrv6(ZodCIDRv6, params));
			inst.e164 = (params) => inst.check(/* @__PURE__ */ _e164(ZodE164, params));
			inst.datetime = (params) => inst.check(datetime(params));
			inst.date = (params) => inst.check(date(params));
			inst.time = (params) => inst.check(time(params));
			inst.duration = (params) => inst.check(duration(params));
		});
		function string(params) {
			return /* @__PURE__ */ _string(ZodString, params);
		}
		const ZodStringFormat = /*@__PURE__*/ $constructor("ZodStringFormat", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			_ZodString.init(inst, def);
		});
		const ZodEmail = /*@__PURE__*/ $constructor("ZodEmail", (inst, def) => {
			$ZodEmail.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodGUID = /*@__PURE__*/ $constructor("ZodGUID", (inst, def) => {
			$ZodGUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodUUID = /*@__PURE__*/ $constructor("ZodUUID", (inst, def) => {
			$ZodUUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodURL = /*@__PURE__*/ $constructor("ZodURL", (inst, def) => {
			$ZodURL.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodEmoji = /*@__PURE__*/ $constructor("ZodEmoji", (inst, def) => {
			$ZodEmoji.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodNanoID = /*@__PURE__*/ $constructor("ZodNanoID", (inst, def) => {
			$ZodNanoID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link ZodCUID2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const ZodCUID = /*@__PURE__*/ $constructor("ZodCUID", (inst, def) => {
			$ZodCUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCUID2 = /*@__PURE__*/ $constructor("ZodCUID2", (inst, def) => {
			$ZodCUID2.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodULID = /*@__PURE__*/ $constructor("ZodULID", (inst, def) => {
			$ZodULID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodXID = /*@__PURE__*/ $constructor("ZodXID", (inst, def) => {
			$ZodXID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodKSUID = /*@__PURE__*/ $constructor("ZodKSUID", (inst, def) => {
			$ZodKSUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodIPv4 = /*@__PURE__*/ $constructor("ZodIPv4", (inst, def) => {
			$ZodIPv4.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodIPv6 = /*@__PURE__*/ $constructor("ZodIPv6", (inst, def) => {
			$ZodIPv6.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCIDRv4 = /*@__PURE__*/ $constructor("ZodCIDRv4", (inst, def) => {
			$ZodCIDRv4.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCIDRv6 = /*@__PURE__*/ $constructor("ZodCIDRv6", (inst, def) => {
			$ZodCIDRv6.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodBase64 = /*@__PURE__*/ $constructor("ZodBase64", (inst, def) => {
			$ZodBase64.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodBase64URL = /*@__PURE__*/ $constructor("ZodBase64URL", (inst, def) => {
			$ZodBase64URL.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodE164 = /*@__PURE__*/ $constructor("ZodE164", (inst, def) => {
			$ZodE164.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodJWT = /*@__PURE__*/ $constructor("ZodJWT", (inst, def) => {
			$ZodJWT.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodNumber = /*@__PURE__*/ $constructor("ZodNumber", (inst, def) => {
			$ZodNumber.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
			_installLazyMethods(inst, "ZodNumber", {
				gt(value, params) {
					return this.check(/* @__PURE__ */ _gt(value, params));
				},
				gte(value, params) {
					return this.check(/* @__PURE__ */ _gte(value, params));
				},
				min(value, params) {
					return this.check(/* @__PURE__ */ _gte(value, params));
				},
				lt(value, params) {
					return this.check(/* @__PURE__ */ _lt(value, params));
				},
				lte(value, params) {
					return this.check(/* @__PURE__ */ _lte(value, params));
				},
				max(value, params) {
					return this.check(/* @__PURE__ */ _lte(value, params));
				},
				int(params) {
					return this.check(int(params));
				},
				safe(params) {
					return this.check(int(params));
				},
				positive(params) {
					return this.check(/* @__PURE__ */ _gt(0, params));
				},
				nonnegative(params) {
					return this.check(/* @__PURE__ */ _gte(0, params));
				},
				negative(params) {
					return this.check(/* @__PURE__ */ _lt(0, params));
				},
				nonpositive(params) {
					return this.check(/* @__PURE__ */ _lte(0, params));
				},
				multipleOf(value, params) {
					return this.check(/* @__PURE__ */ _multipleOf(value, params));
				},
				step(value, params) {
					return this.check(/* @__PURE__ */ _multipleOf(value, params));
				},
				finite() {
					return this;
				}
			});
			const bag = inst._zod.bag;
			inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
			inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
			inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? .5);
			inst.isFinite = true;
			inst.format = bag.format ?? null;
		});
		function number(params) {
			return /* @__PURE__ */ _number(ZodNumber, params);
		}
		const ZodNumberFormat = /*@__PURE__*/ $constructor("ZodNumberFormat", (inst, def) => {
			$ZodNumberFormat.init(inst, def);
			ZodNumber.init(inst, def);
		});
		function int(params) {
			return /* @__PURE__ */ _int(ZodNumberFormat, params);
		}
		const ZodBoolean = /*@__PURE__*/ $constructor("ZodBoolean", (inst, def) => {
			$ZodBoolean.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
		});
		function boolean(params) {
			return /* @__PURE__ */ _boolean(ZodBoolean, params);
		}
		const ZodUndefined = /*@__PURE__*/ $constructor("ZodUndefined", (inst, def) => {
			$ZodUndefined.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => undefinedProcessor(inst, ctx, json, params);
		});
		function _undefined(params) {
			return /* @__PURE__ */ _undefined$1(ZodUndefined, params);
		}
		const ZodUnknown = /*@__PURE__*/ $constructor("ZodUnknown", (inst, def) => {
			$ZodUnknown.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => void 0;
		});
		function unknown() {
			return /* @__PURE__ */ _unknown(ZodUnknown);
		}
		const ZodNever = /*@__PURE__*/ $constructor("ZodNever", (inst, def) => {
			$ZodNever.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
		});
		function never(params) {
			return /* @__PURE__ */ _never(ZodNever, params);
		}
		const ZodVoid = /*@__PURE__*/ $constructor("ZodVoid", (inst, def) => {
			$ZodVoid.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => voidProcessor(inst, ctx, json, params);
		});
		function _void(params) {
			return /* @__PURE__ */ _void$1(ZodVoid, params);
		}
		const ZodArray = /*@__PURE__*/ $constructor("ZodArray", (inst, def) => {
			$ZodArray.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
			inst.element = def.element;
			_installLazyMethods(inst, "ZodArray", {
				min(n, params) {
					return this.check(/* @__PURE__ */ _minLength(n, params));
				},
				nonempty(params) {
					return this.check(/* @__PURE__ */ _minLength(1, params));
				},
				max(n, params) {
					return this.check(/* @__PURE__ */ _maxLength(n, params));
				},
				length(n, params) {
					return this.check(/* @__PURE__ */ _length(n, params));
				},
				unwrap() {
					return this.element;
				}
			});
		});
		function array(element, params) {
			return /* @__PURE__ */ _array(ZodArray, element, params);
		}
		const ZodObject = /*@__PURE__*/ $constructor("ZodObject", (inst, def) => {
			$ZodObjectJIT.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
			defineLazy(inst, "shape", () => {
				return def.shape;
			});
			_installLazyMethods(inst, "ZodObject", {
				keyof() {
					return _enum(Object.keys(this._zod.def.shape));
				},
				catchall(catchall) {
					return this.clone({
						...this._zod.def,
						catchall
					});
				},
				passthrough() {
					return this.clone({
						...this._zod.def,
						catchall: unknown()
					});
				},
				loose() {
					return this.clone({
						...this._zod.def,
						catchall: unknown()
					});
				},
				strict() {
					return this.clone({
						...this._zod.def,
						catchall: never()
					});
				},
				strip() {
					return this.clone({
						...this._zod.def,
						catchall: void 0
					});
				},
				extend(incoming) {
					return extend(this, incoming);
				},
				safeExtend(incoming) {
					return safeExtend(this, incoming);
				},
				merge(other) {
					return merge(this, other);
				},
				pick(mask) {
					return pick(this, mask);
				},
				omit(mask) {
					return omit(this, mask);
				},
				partial(...args) {
					return partial(ZodOptional, this, args[0]);
				},
				required(...args) {
					return required(ZodNonOptional, this, args[0]);
				}
			});
		});
		function object(shape, params) {
			const def = {
				type: "object",
				shape: shape ?? {},
				...normalizeParams(params)
			};
			return new ZodObject(def);
		}
		const ZodUnion = /*@__PURE__*/ $constructor("ZodUnion", (inst, def) => {
			$ZodUnion.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
			inst.options = def.options;
		});
		function union(options, params) {
			return new ZodUnion({
				type: "union",
				options,
				...normalizeParams(params)
			});
		}
		const ZodIntersection = /*@__PURE__*/ $constructor("ZodIntersection", (inst, def) => {
			$ZodIntersection.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
		});
		function intersection(left, right) {
			return new ZodIntersection({
				type: "intersection",
				left,
				right
			});
		}
		const ZodRecord = /*@__PURE__*/ $constructor("ZodRecord", (inst, def) => {
			$ZodRecord.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => recordProcessor(inst, ctx, json, params);
			inst.keyType = def.keyType;
			inst.valueType = def.valueType;
		});
		function record(keyType, valueType, params) {
			if (!valueType || !valueType._zod) return new ZodRecord({
				type: "record",
				keyType: string(),
				valueType: keyType,
				...normalizeParams(valueType)
			});
			return new ZodRecord({
				type: "record",
				keyType,
				valueType,
				...normalizeParams(params)
			});
		}
		const ZodEnum = /*@__PURE__*/ $constructor("ZodEnum", (inst, def) => {
			$ZodEnum.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
			inst.enum = def.entries;
			inst.options = Object.values(def.entries);
			const keys = new Set(Object.keys(def.entries));
			inst.extract = (values, params) => {
				const newEntries = {};
				for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
				else throw new Error(`Key ${value} not found in enum`);
				return new ZodEnum({
					...def,
					checks: [],
					...normalizeParams(params),
					entries: newEntries
				});
			};
			inst.exclude = (values, params) => {
				const newEntries = { ...def.entries };
				for (const value of values) if (keys.has(value)) delete newEntries[value];
				else throw new Error(`Key ${value} not found in enum`);
				return new ZodEnum({
					...def,
					checks: [],
					...normalizeParams(params),
					entries: newEntries
				});
			};
		});
		function _enum(values, params) {
			const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
			return new ZodEnum({
				type: "enum",
				entries,
				...normalizeParams(params)
			});
		}
		const ZodLiteral = /*@__PURE__*/ $constructor("ZodLiteral", (inst, def) => {
			$ZodLiteral.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
			inst.values = new Set(def.values);
			Object.defineProperty(inst, "value", { get() {
				if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
				return def.values[0];
			} });
		});
		function literal(value, params) {
			return new ZodLiteral({
				type: "literal",
				values: Array.isArray(value) ? value : [value],
				...normalizeParams(params)
			});
		}
		const ZodTransform = /*@__PURE__*/ $constructor("ZodTransform", (inst, def) => {
			$ZodTransform.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
			inst._zod.parse = (payload, _ctx) => {
				if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
				payload.addIssue = (issue$1) => {
					if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
					else {
						const _issue = issue$1;
						if (_issue.fatal) _issue.continue = false;
						_issue.code ?? (_issue.code = "custom");
						_issue.input ?? (_issue.input = payload.value);
						_issue.inst ?? (_issue.inst = inst);
						payload.issues.push(issue(_issue));
					}
				};
				const output = def.transform(payload.value, payload);
				if (output instanceof Promise) return output.then((output) => {
					payload.value = output;
					payload.fallback = true;
					return payload;
				});
				payload.value = output;
				payload.fallback = true;
				return payload;
			};
		});
		function transform(fn) {
			return new ZodTransform({
				type: "transform",
				transform: fn
			});
		}
		const ZodOptional = /*@__PURE__*/ $constructor("ZodOptional", (inst, def) => {
			$ZodOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function optional(innerType) {
			return new ZodOptional({
				type: "optional",
				innerType
			});
		}
		const ZodExactOptional = /*@__PURE__*/ $constructor("ZodExactOptional", (inst, def) => {
			$ZodExactOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function exactOptional(innerType) {
			return new ZodExactOptional({
				type: "optional",
				innerType
			});
		}
		const ZodNullable = /*@__PURE__*/ $constructor("ZodNullable", (inst, def) => {
			$ZodNullable.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function nullable(innerType) {
			return new ZodNullable({
				type: "nullable",
				innerType
			});
		}
		const ZodDefault = /*@__PURE__*/ $constructor("ZodDefault", (inst, def) => {
			$ZodDefault.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
			inst.removeDefault = inst.unwrap;
		});
		function _default(innerType, defaultValue) {
			return new ZodDefault({
				type: "default",
				innerType,
				get defaultValue() {
					return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
				}
			});
		}
		const ZodPrefault = /*@__PURE__*/ $constructor("ZodPrefault", (inst, def) => {
			$ZodPrefault.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function prefault(innerType, defaultValue) {
			return new ZodPrefault({
				type: "prefault",
				innerType,
				get defaultValue() {
					return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
				}
			});
		}
		const ZodNonOptional = /*@__PURE__*/ $constructor("ZodNonOptional", (inst, def) => {
			$ZodNonOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function nonoptional(innerType, params) {
			return new ZodNonOptional({
				type: "nonoptional",
				innerType,
				...normalizeParams(params)
			});
		}
		const ZodCatch = /*@__PURE__*/ $constructor("ZodCatch", (inst, def) => {
			$ZodCatch.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
			inst.removeCatch = inst.unwrap;
		});
		function _catch(innerType, catchValue) {
			return new ZodCatch({
				type: "catch",
				innerType,
				catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
			});
		}
		const ZodPipe = /*@__PURE__*/ $constructor("ZodPipe", (inst, def) => {
			$ZodPipe.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
			inst.in = def.in;
			inst.out = def.out;
		});
		function pipe(in_, out) {
			return new ZodPipe({
				type: "pipe",
				in: in_,
				out
			});
		}
		const ZodReadonly = /*@__PURE__*/ $constructor("ZodReadonly", (inst, def) => {
			$ZodReadonly.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function readonly(innerType) {
			return new ZodReadonly({
				type: "readonly",
				innerType
			});
		}
		const ZodLazy = /*@__PURE__*/ $constructor("ZodLazy", (inst, def) => {
			$ZodLazy.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => lazyProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.getter();
		});
		function lazy(getter) {
			return new ZodLazy({
				type: "lazy",
				getter
			});
		}
		const ZodCustom = /*@__PURE__*/ $constructor("ZodCustom", (inst, def) => {
			$ZodCustom.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
		});
		function refine(fn, _params = {}) {
			return /* @__PURE__ */ _refine(ZodCustom, fn, _params);
		}
		function superRefine(fn, params) {
			return /* @__PURE__ */ _superRefine(fn, params);
		}
		//#endregion
		//#region lib/typert.remote-client.js
		let JsonRemoteCodec$schema$value;
		const JsonRemoteCodec$schema = () => JsonRemoteCodec$schema$value ??= union([
			literal(null),
			string(),
			number(),
			literal(false),
			literal(true),
			array(lazy(() => JsonRemoteCodec$schema())),
			record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
		]);
		let JsonRemoteCodec$schema2$value;
		const JsonRemoteCodec$schema2 = () => JsonRemoteCodec$schema2$value ??= union([
			literal(null),
			string(),
			number(),
			literal(false),
			literal(true),
			array(lazy(() => JsonRemoteCodec$schema2())),
			record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
		]);
		let _dsh_jev_plugin_jev_cancelStageAnalysis_parameter_0$schema$value;
		const _dsh_jev_plugin_jev_cancelStageAnalysis_parameter_0$schema = () => _dsh_jev_plugin_jev_cancelStageAnalysis_parameter_0$schema$value ??= string();
		let _dsh_jev_plugin_jev_cancelStageAnalysis_result$schema$value;
		const _dsh_jev_plugin_jev_cancelStageAnalysis_result$schema = () => _dsh_jev_plugin_jev_cancelStageAnalysis_result$schema$value ??= _void();
		let _dsh_jev_plugin_jev_getCredentialStatus_parameter_0$schema$value;
		const _dsh_jev_plugin_jev_getCredentialStatus_parameter_0$schema = () => _dsh_jev_plugin_jev_getCredentialStatus_parameter_0$schema$value ??= object({
			"connectionId": union([
				literal("jev"),
				literal("luna-openrouter"),
				literal("luna-openai")
			]),
			"baseUrl": string(),
			"model": string(),
			"credentialRef": string(),
			"timeoutMs": number()
		});
		let _dsh_jev_plugin_jev_getCredentialStatus_result$schema$value;
		const _dsh_jev_plugin_jev_getCredentialStatus_result$schema = () => _dsh_jev_plugin_jev_getCredentialStatus_result$schema$value ??= object({
			"connection": object({
				"connectionId": union([
					literal("jev"),
					literal("luna-openrouter"),
					literal("luna-openai")
				]),
				"baseUrl": string(),
				"model": string(),
				"credentialRef": string(),
				"timeoutMs": number()
			}),
			"configured": boolean(),
			"writable": boolean(),
			"source": union([_undefined(), string()]).optional()
		});
		let _dsh_jev_plugin_jev_getRecord_parameter_0$schema$value;
		const _dsh_jev_plugin_jev_getRecord_parameter_0$schema = () => _dsh_jev_plugin_jev_getRecord_parameter_0$schema$value ??= string();
		let _dsh_jev_plugin_jev_getRecord_result$schema$value;
		const _dsh_jev_plugin_jev_getRecord_result$schema = () => _dsh_jev_plugin_jev_getRecord_result$schema$value ??= union([literal(null), object({
			"link": object({
				"sessionId": union([_undefined(), string()]).optional(),
				"runId": union([_undefined(), string()]).optional(),
				"stepId": union([_undefined(), string()]).optional(),
				"inputVersion": union([_undefined(), string()]).optional()
			}),
			"attemptRecords": array(object({
				"id": string(),
				"startedAt": string(),
				"settledAt": union([_undefined(), string()]).optional(),
				"latencyMs": union([_undefined(), number()]).optional(),
				"connection": object({
					"baseUrl": string(),
					"model": string(),
					"credentialRef": string(),
					"connectionId": union([
						_undefined(),
						literal("jev"),
						literal("luna-openrouter"),
						literal("luna-openai")
					]).optional()
				}),
				"request": object({
					"state": union([
						literal(null),
						string(),
						number(),
						literal(false),
						literal(true),
						array(lazy(() => JsonRemoteCodec$schema())),
						record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
					]),
					"questions": array(union([
						object({
							"id": string(),
							"kind": literal("choice"),
							"prompt": union([
								string(),
								array(union([
									literal(null),
									string(),
									number(),
									literal(false),
									literal(true),
									array(lazy(() => JsonRemoteCodec$schema())),
									record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
								])),
								record(string(), union([
									literal(null),
									string(),
									number(),
									literal(false),
									literal(true),
									array(lazy(() => JsonRemoteCodec$schema())),
									record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
								])).readonly()
							]),
							"options": array(object({
								"id": string(),
								"description": union([
									literal(null),
									string(),
									array(union([
										literal(null),
										string(),
										number(),
										literal(false),
										literal(true),
										array(lazy(() => JsonRemoteCodec$schema())),
										record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
									])),
									record(string(), union([
										literal(null),
										string(),
										number(),
										literal(false),
										literal(true),
										array(lazy(() => JsonRemoteCodec$schema())),
										record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
									])).readonly()
								])
							}))
						}),
						object({
							"id": string(),
							"kind": literal("score"),
							"prompt": union([
								string(),
								array(union([
									literal(null),
									string(),
									number(),
									literal(false),
									literal(true),
									array(lazy(() => JsonRemoteCodec$schema())),
									record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
								])),
								record(string(), union([
									literal(null),
									string(),
									number(),
									literal(false),
									literal(true),
									array(lazy(() => JsonRemoteCodec$schema())),
									record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
								])).readonly()
							]),
							"levels": array(union([
								literal(null),
								string(),
								array(union([
									literal(null),
									string(),
									number(),
									literal(false),
									literal(true),
									array(lazy(() => JsonRemoteCodec$schema())),
									record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
								])),
								record(string(), union([
									literal(null),
									string(),
									number(),
									literal(false),
									literal(true),
									array(lazy(() => JsonRemoteCodec$schema())),
									record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
								])).readonly()
							]))
						}),
						object({
							"id": string(),
							"kind": literal("noul"),
							"prompt": union([
								string(),
								array(union([
									literal(null),
									string(),
									number(),
									literal(false),
									literal(true),
									array(lazy(() => JsonRemoteCodec$schema())),
									record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
								])),
								record(string(), union([
									literal(null),
									string(),
									number(),
									literal(false),
									literal(true),
									array(lazy(() => JsonRemoteCodec$schema())),
									record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
								])).readonly()
							]),
							"criteria": union([_undefined(), object({
								"true": union([
									_undefined(),
									literal(null),
									string(),
									array(union([
										literal(null),
										string(),
										number(),
										literal(false),
										literal(true),
										array(lazy(() => JsonRemoteCodec$schema())),
										record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
									])),
									record(string(), union([
										literal(null),
										string(),
										number(),
										literal(false),
										literal(true),
										array(lazy(() => JsonRemoteCodec$schema())),
										record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
									])).readonly()
								]).optional(),
								"false": union([
									_undefined(),
									literal(null),
									string(),
									array(union([
										literal(null),
										string(),
										number(),
										literal(false),
										literal(true),
										array(lazy(() => JsonRemoteCodec$schema())),
										record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
									])),
									record(string(), union([
										literal(null),
										string(),
										number(),
										literal(false),
										literal(true),
										array(lazy(() => JsonRemoteCodec$schema())),
										record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
									])).readonly()
								]).optional()
							})]).optional()
						})
					]))
				}),
				"status": union([
					literal("pending"),
					literal("waiting"),
					literal("succeeded"),
					literal("failed"),
					literal("cancelled"),
					literal("interrupted")
				]),
				"rawResponse": union([
					_undefined(),
					literal(null),
					string(),
					number(),
					literal(false),
					literal(true),
					array(lazy(() => JsonRemoteCodec$schema())),
					record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
				]).optional(),
				"response": union([_undefined(), object({ "answers": array(union([
					object({
						"id": string(),
						"kind": literal("choice"),
						"optionId": string(),
						"probabilities": union([_undefined(), record(string(), number())]).optional(),
						"confidence": union([_undefined(), number()]).optional(),
						"legend": union([
							_undefined(),
							literal(null),
							string(),
							number(),
							literal(false),
							literal(true),
							array(lazy(() => JsonRemoteCodec$schema())),
							record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
						]).optional()
					}),
					object({
						"id": string(),
						"kind": literal("score"),
						"value": number(),
						"probabilities": union([_undefined(), record(string(), number())]).optional(),
						"confidence": union([_undefined(), number()]).optional(),
						"legend": union([
							_undefined(),
							literal(null),
							string(),
							number(),
							literal(false),
							literal(true),
							array(lazy(() => JsonRemoteCodec$schema())),
							record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
						]).optional()
					}),
					object({
						"id": string(),
						"kind": literal("noul"),
						"probability": number(),
						"confidence": union([_undefined(), number()]).optional(),
						"legend": union([
							_undefined(),
							literal(null),
							string(),
							number(),
							literal(false),
							literal(true),
							array(lazy(() => JsonRemoteCodec$schema())),
							record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
						]).optional()
					})
				])) })]).optional(),
				"interpretation": union([_undefined(), object({
					"usable": boolean(),
					"reason": union([_undefined(), string()]).optional()
				})]).optional(),
				"failure": union([_undefined(), object({
					"code": string(),
					"message": string()
				})]).optional(),
				"usage": union([_undefined(), object({
					"inputTokens": union([_undefined(), number()]).optional(),
					"outputTokens": union([_undefined(), number()]).optional()
				})]).optional(),
				"networkRecords": union([_undefined(), array(object({
					"id": string(),
					"questionIds": array(string()),
					"requestBody": union([
						literal(null),
						string(),
						number(),
						literal(false),
						literal(true),
						array(lazy(() => JsonRemoteCodec$schema())),
						record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
					]),
					"startedAt": string(),
					"dispatchedAt": union([_undefined(), string()]).optional(),
					"settledAt": union([_undefined(), string()]).optional(),
					"status": union([
						literal("pending"),
						literal("succeeded"),
						literal("failed")
					]),
					"httpStatus": union([_undefined(), number()]).optional(),
					"rawResponseText": union([_undefined(), string()]).optional(),
					"rawResponse": union([
						_undefined(),
						literal(null),
						string(),
						number(),
						literal(false),
						literal(true),
						array(lazy(() => JsonRemoteCodec$schema())),
						record(string(), lazy(() => JsonRemoteCodec$schema())).readonly()
					]).optional(),
					"returnedModel": union([_undefined(), string()]).optional(),
					"requestId": union([_undefined(), string()]).optional(),
					"usage": union([_undefined(), object({
						"inputTokens": union([_undefined(), number()]).optional(),
						"outputTokens": union([_undefined(), number()]).optional()
					})]).optional(),
					"failure": union([_undefined(), object({
						"code": string(),
						"message": string()
					})]).optional()
				}))]).optional(),
				"usageComplete": union([
					_undefined(),
					literal(false),
					literal(true)
				]).optional()
			})),
			"receipts": array(object({
				"id": string(),
				"status": union([
					literal("cancelled"),
					literal("unconfirmed"),
					literal("not-adopted"),
					literal("executed"),
					literal("execution-failed"),
					literal("observed")
				]),
				"reason": union([_undefined(), string()]).optional(),
				"at": string()
			})),
			"failure": union([_undefined(), object({
				"code": string(),
				"message": string()
			})]).optional(),
			"id": string(),
			"featureId": string(),
			"sessionId": union([_undefined(), string()]).optional(),
			"status": union([
				literal("pending"),
				literal("waiting"),
				literal("succeeded"),
				literal("failed"),
				literal("cancelled"),
				literal("interrupted")
			]),
			"startedAt": string(),
			"updatedAt": string(),
			"attempts": number(),
			"actionStatus": union([
				_undefined(),
				literal("cancelled"),
				literal("unconfirmed"),
				literal("not-adopted"),
				literal("executed"),
				literal("execution-failed"),
				literal("observed")
			]).optional(),
			"diagnostic": boolean()
		})]);
		let _dsh_jev_plugin_jev_getStageAnalysisRecord_parameter_0$schema$value;
		const _dsh_jev_plugin_jev_getStageAnalysisRecord_parameter_0$schema = () => _dsh_jev_plugin_jev_getStageAnalysisRecord_parameter_0$schema$value ??= string();
		let _dsh_jev_plugin_jev_getStageAnalysisRecord_parameter_1$schema$value;
		const _dsh_jev_plugin_jev_getStageAnalysisRecord_parameter_1$schema = () => _dsh_jev_plugin_jev_getStageAnalysisRecord_parameter_1$schema$value ??= string();
		let _dsh_jev_plugin_jev_getStageAnalysisRecord_parameter_2$schema$value;
		const _dsh_jev_plugin_jev_getStageAnalysisRecord_parameter_2$schema = () => _dsh_jev_plugin_jev_getStageAnalysisRecord_parameter_2$schema$value ??= union([_undefined(), string()]);
		let _dsh_jev_plugin_jev_getStageAnalysisRecord_result$schema$value;
		const _dsh_jev_plugin_jev_getStageAnalysisRecord_result$schema = () => _dsh_jev_plugin_jev_getStageAnalysisRecord_result$schema$value ??= union([literal(null), object({
			"id": string(),
			"sessionId": string(),
			"stepId": string(),
			"revision": number(),
			"sourceFingerprint": string(),
			"ruleVersion": string(),
			"request": union([_undefined(), object({
				"state": union([
					literal(null),
					string(),
					number(),
					literal(false),
					literal(true),
					array(lazy(() => JsonRemoteCodec$schema2())),
					record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
				]),
				"questions": array(union([
					object({
						"id": string(),
						"kind": literal("choice"),
						"prompt": union([
							string(),
							array(union([
								literal(null),
								string(),
								number(),
								literal(false),
								literal(true),
								array(lazy(() => JsonRemoteCodec$schema2())),
								record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
							])),
							record(string(), union([
								literal(null),
								string(),
								number(),
								literal(false),
								literal(true),
								array(lazy(() => JsonRemoteCodec$schema2())),
								record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
							])).readonly()
						]),
						"options": array(object({
							"id": string(),
							"description": union([
								literal(null),
								string(),
								array(union([
									literal(null),
									string(),
									number(),
									literal(false),
									literal(true),
									array(lazy(() => JsonRemoteCodec$schema2())),
									record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
								])),
								record(string(), union([
									literal(null),
									string(),
									number(),
									literal(false),
									literal(true),
									array(lazy(() => JsonRemoteCodec$schema2())),
									record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
								])).readonly()
							])
						}))
					}),
					object({
						"id": string(),
						"kind": literal("score"),
						"prompt": union([
							string(),
							array(union([
								literal(null),
								string(),
								number(),
								literal(false),
								literal(true),
								array(lazy(() => JsonRemoteCodec$schema2())),
								record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
							])),
							record(string(), union([
								literal(null),
								string(),
								number(),
								literal(false),
								literal(true),
								array(lazy(() => JsonRemoteCodec$schema2())),
								record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
							])).readonly()
						]),
						"levels": array(union([
							literal(null),
							string(),
							array(union([
								literal(null),
								string(),
								number(),
								literal(false),
								literal(true),
								array(lazy(() => JsonRemoteCodec$schema2())),
								record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
							])),
							record(string(), union([
								literal(null),
								string(),
								number(),
								literal(false),
								literal(true),
								array(lazy(() => JsonRemoteCodec$schema2())),
								record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
							])).readonly()
						]))
					}),
					object({
						"id": string(),
						"kind": literal("noul"),
						"prompt": union([
							string(),
							array(union([
								literal(null),
								string(),
								number(),
								literal(false),
								literal(true),
								array(lazy(() => JsonRemoteCodec$schema2())),
								record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
							])),
							record(string(), union([
								literal(null),
								string(),
								number(),
								literal(false),
								literal(true),
								array(lazy(() => JsonRemoteCodec$schema2())),
								record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
							])).readonly()
						]),
						"criteria": union([_undefined(), object({
							"true": union([
								_undefined(),
								literal(null),
								string(),
								array(union([
									literal(null),
									string(),
									number(),
									literal(false),
									literal(true),
									array(lazy(() => JsonRemoteCodec$schema2())),
									record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
								])),
								record(string(), union([
									literal(null),
									string(),
									number(),
									literal(false),
									literal(true),
									array(lazy(() => JsonRemoteCodec$schema2())),
									record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
								])).readonly()
							]).optional(),
							"false": union([
								_undefined(),
								literal(null),
								string(),
								array(union([
									literal(null),
									string(),
									number(),
									literal(false),
									literal(true),
									array(lazy(() => JsonRemoteCodec$schema2())),
									record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
								])),
								record(string(), union([
									literal(null),
									string(),
									number(),
									literal(false),
									literal(true),
									array(lazy(() => JsonRemoteCodec$schema2())),
									record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
								])).readonly()
							]).optional()
						})]).optional()
					})
				]))
			})]).optional(),
			"response": union([_undefined(), object({ "answers": array(union([
				object({
					"id": string(),
					"kind": literal("choice"),
					"optionId": string(),
					"probabilities": union([_undefined(), record(string(), number())]).optional(),
					"confidence": union([_undefined(), number()]).optional(),
					"legend": union([
						_undefined(),
						literal(null),
						string(),
						number(),
						literal(false),
						literal(true),
						array(lazy(() => JsonRemoteCodec$schema2())),
						record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
					]).optional()
				}),
				object({
					"id": string(),
					"kind": literal("score"),
					"value": number(),
					"probabilities": union([_undefined(), record(string(), number())]).optional(),
					"confidence": union([_undefined(), number()]).optional(),
					"legend": union([
						_undefined(),
						literal(null),
						string(),
						number(),
						literal(false),
						literal(true),
						array(lazy(() => JsonRemoteCodec$schema2())),
						record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
					]).optional()
				}),
				object({
					"id": string(),
					"kind": literal("noul"),
					"probability": number(),
					"confidence": union([_undefined(), number()]).optional(),
					"legend": union([
						_undefined(),
						literal(null),
						string(),
						number(),
						literal(false),
						literal(true),
						array(lazy(() => JsonRemoteCodec$schema2())),
						record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
					]).optional()
				})
			])) })]).optional(),
			"rawResponse": union([
				_undefined(),
				literal(null),
				string(),
				number(),
				literal(false),
				literal(true),
				array(lazy(() => JsonRemoteCodec$schema2())),
				record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
			]).optional(),
			"connection": union([_undefined(), object({
				"baseUrl": string(),
				"model": string(),
				"credentialRef": string(),
				"connectionId": union([
					_undefined(),
					literal("jev"),
					literal("luna-openrouter"),
					literal("luna-openai")
				]).optional()
			})]).optional(),
			"networkRecords": union([_undefined(), array(object({
				"id": string(),
				"questionIds": array(string()),
				"requestBody": union([
					literal(null),
					string(),
					number(),
					literal(false),
					literal(true),
					array(lazy(() => JsonRemoteCodec$schema2())),
					record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
				]),
				"startedAt": string(),
				"dispatchedAt": union([_undefined(), string()]).optional(),
				"settledAt": union([_undefined(), string()]).optional(),
				"status": union([
					literal("pending"),
					literal("succeeded"),
					literal("failed")
				]),
				"httpStatus": union([_undefined(), number()]).optional(),
				"rawResponseText": union([_undefined(), string()]).optional(),
				"rawResponse": union([
					_undefined(),
					literal(null),
					string(),
					number(),
					literal(false),
					literal(true),
					array(lazy(() => JsonRemoteCodec$schema2())),
					record(string(), lazy(() => JsonRemoteCodec$schema2())).readonly()
				]).optional(),
				"returnedModel": union([_undefined(), string()]).optional(),
				"requestId": union([_undefined(), string()]).optional(),
				"usage": union([_undefined(), object({
					"inputTokens": union([_undefined(), number()]).optional(),
					"outputTokens": union([_undefined(), number()]).optional()
				})]).optional(),
				"failure": union([_undefined(), object({
					"code": string(),
					"message": string()
				})]).optional()
			}))]).optional(),
			"usage": union([_undefined(), object({
				"inputTokens": union([_undefined(), number()]).optional(),
				"outputTokens": union([_undefined(), number()]).optional()
			})]).optional(),
			"usageComplete": union([
				_undefined(),
				literal(false),
				literal(true)
			]).optional(),
			"status": union([
				literal("pending"),
				literal("succeeded"),
				literal("failed"),
				literal("cancelled"),
				literal("interrupted"),
				literal("unanalysed"),
				literal("stale"),
				literal("unavailable")
			]),
			"label": union([
				_undefined(),
				literal("input_parsing"),
				literal("problem_understanding"),
				literal("solution_planning"),
				literal("implementation"),
				literal("review_validation"),
				literal("delivery_finalization"),
				literal("mixed"),
				literal("unknown")
			]).optional(),
			"confidence": union([_undefined(), number()]).optional(),
			"probabilities": union([_undefined(), record(string(), number())]).optional(),
			"model": union([_undefined(), string()]).optional(),
			"configuredModel": union([_undefined(), string()]).optional(),
			"connectionId": union([
				_undefined(),
				literal("jev"),
				literal("luna-openrouter"),
				literal("luna-openai")
			]).optional(),
			"recordId": union([_undefined(), string()]).optional(),
			"operationId": union([_undefined(), string()]).optional(),
			"failure": union([_undefined(), object({
				"code": string(),
				"message": string()
			})]).optional(),
			"updatedAt": union([_undefined(), string()]).optional(),
			"previousResult": union([_undefined(), object({
				"recordId": string(),
				"label": union([
					literal("input_parsing"),
					literal("problem_understanding"),
					literal("solution_planning"),
					literal("implementation"),
					literal("review_validation"),
					literal("delivery_finalization"),
					literal("mixed"),
					literal("unknown")
				]),
				"stale": boolean(),
				"confidence": union([_undefined(), number()]).optional(),
				"probabilities": union([_undefined(), record(string(), number())]).optional(),
				"model": union([_undefined(), string()]).optional(),
				"configuredModel": union([_undefined(), string()]).optional(),
				"connectionId": union([
					_undefined(),
					literal("jev"),
					literal("luna-openrouter"),
					literal("luna-openai")
				]).optional(),
				"updatedAt": union([_undefined(), string()]).optional()
			})]).optional()
		})]);
		let _dsh_jev_plugin_jev_getStageNavigation_parameter_0$schema$value;
		const _dsh_jev_plugin_jev_getStageNavigation_parameter_0$schema = () => _dsh_jev_plugin_jev_getStageNavigation_parameter_0$schema$value ??= string();
		let _dsh_jev_plugin_jev_getStageNavigation_result$schema$value;
		const _dsh_jev_plugin_jev_getStageNavigation_result$schema = () => _dsh_jev_plugin_jev_getStageNavigation_result$schema$value ??= object({
			"sessionId": string(),
			"cursor": number(),
			"featureEnabled": boolean(),
			"turns": array(object({
				"id": string(),
				"turn": number(),
				"startSeq": number(),
				"endSeq": union([_undefined(), number()]).optional(),
				"reason": union([
					_undefined(),
					object({ "kind": literal("interrupted") }),
					object({ "kind": literal("completed") }),
					object({
						"kind": literal("aborted"),
						"reason": union([
							object({ "kind": literal("user").readonly() }),
							object({ "kind": literal("parent").readonly() }),
							object({
								"kind": literal("hook").readonly(),
								"reason": string().readonly()
							}),
							object({ "kind": literal("disposed").readonly() }),
							object({ "kind": literal("legacy").readonly() })
						])
					}),
					object({ "kind": literal("blocked") }),
					object({
						"kind": literal("error"),
						"error": object({
							"message": string().readonly(),
							"code": string().readonly(),
							"status": union([_undefined(), number()]).readonly().optional(),
							"providerRetryAfterMs": union([_undefined(), number()]).readonly().optional(),
							"requestId": union([_undefined(), intersection(string(), unknown())]).readonly().optional(),
							"offloadImages": union([_undefined(), number()]).readonly().optional()
						})
					}),
					object({ "kind": literal("max-tokens") }),
					object({ "kind": literal("forked") })
				]).optional(),
				"requests": array(object({
					"seq": number(),
					"content": array(union([
						object({
							"type": literal("text"),
							"text": string()
						}),
						object({
							"type": literal("reasoning"),
							"text": string()
						}),
						object({
							"type": literal("image"),
							"attachment": object({
								"attachmentId": intersection(string(), unknown()),
								"mediaType": union([
									literal("image/png"),
									literal("image/jpeg"),
									literal("image/webp"),
									literal("image/gif")
								]),
								"bytes": number(),
								"width": number(),
								"height": number(),
								"name": union([_undefined(), string()]).optional(),
								"originalDimensions": union([_undefined(), object({
									"width": number(),
									"height": number()
								})]).optional()
							}),
							"offloaded": union([_undefined(), literal(true)]).optional()
						}),
						object({
							"type": literal("file"),
							"attachment": object({
								"attachmentId": intersection(string(), unknown()),
								"name": string(),
								"bytes": number()
							})
						}),
						object({
							"type": literal("tool-call"),
							"id": intersection(string(), unknown()),
							"name": string(),
							"arguments": string()
						}),
						object({
							"type": literal("tool-addition"),
							"toolName": string(),
							"tool": _undefined().optional()
						}),
						object({
							"type": literal("tool-removal"),
							"toolName": string()
						})
					]))
				})),
				"steps": array(object({
					"id": string(),
					"turn": number(),
					"step": number(),
					"startSeq": number(),
					"endSeq": union([_undefined(), number()]).optional(),
					"status": union([
						literal("complete"),
						literal("terminal-partial"),
						literal("in-progress")
					]),
					"classifiable": boolean(),
					"materialStatus": union([
						literal("ready"),
						literal("IN_PROGRESS"),
						literal("NO_MATERIAL"),
						literal("MATERIAL_TOO_LARGE")
					]),
					"assistant": union([_undefined(), intersection(object({
						"seq": number(),
						"content": array(union([
							object({
								"type": literal("text"),
								"text": string()
							}),
							object({
								"type": literal("reasoning"),
								"text": string()
							}),
							object({
								"type": literal("image"),
								"attachment": object({
									"attachmentId": intersection(string(), unknown()),
									"mediaType": union([
										literal("image/png"),
										literal("image/jpeg"),
										literal("image/webp"),
										literal("image/gif")
									]),
									"bytes": number(),
									"width": number(),
									"height": number(),
									"name": union([_undefined(), string()]).optional(),
									"originalDimensions": union([_undefined(), object({
										"width": number(),
										"height": number()
									})]).optional()
								}),
								"offloaded": union([_undefined(), literal(true)]).optional()
							}),
							object({
								"type": literal("file"),
								"attachment": object({
									"attachmentId": intersection(string(), unknown()),
									"name": string(),
									"bytes": number()
								})
							}),
							object({
								"type": literal("tool-call"),
								"id": intersection(string(), unknown()),
								"name": string(),
								"arguments": string()
							}),
							object({
								"type": literal("tool-addition"),
								"toolName": string(),
								"tool": _undefined().optional()
							}),
							object({
								"type": literal("tool-removal"),
								"toolName": string()
							})
						]))
					}), object({ "interrupted": boolean() }))]).optional(),
					"messages": array(intersection(object({
						"seq": number(),
						"content": array(union([
							object({
								"type": literal("text"),
								"text": string()
							}),
							object({
								"type": literal("reasoning"),
								"text": string()
							}),
							object({
								"type": literal("image"),
								"attachment": object({
									"attachmentId": intersection(string(), unknown()),
									"mediaType": union([
										literal("image/png"),
										literal("image/jpeg"),
										literal("image/webp"),
										literal("image/gif")
									]),
									"bytes": number(),
									"width": number(),
									"height": number(),
									"name": union([_undefined(), string()]).optional(),
									"originalDimensions": union([_undefined(), object({
										"width": number(),
										"height": number()
									})]).optional()
								}),
								"offloaded": union([_undefined(), literal(true)]).optional()
							}),
							object({
								"type": literal("file"),
								"attachment": object({
									"attachmentId": intersection(string(), unknown()),
									"name": string(),
									"bytes": number()
								})
							}),
							object({
								"type": literal("tool-call"),
								"id": intersection(string(), unknown()),
								"name": string(),
								"arguments": string()
							}),
							object({
								"type": literal("tool-addition"),
								"toolName": string(),
								"tool": _undefined().optional()
							}),
							object({
								"type": literal("tool-removal"),
								"toolName": string()
							})
						]))
					}), object({ "interrupted": boolean() }))),
					"tools": array(object({
						"callId": string(),
						"name": string(),
						"arguments": string(),
						"seq": number(),
						"dispatched": boolean(),
						"result": union([_undefined(), intersection(object({
							"seq": number(),
							"content": array(union([
								object({
									"type": literal("text"),
									"text": string()
								}),
								object({
									"type": literal("reasoning"),
									"text": string()
								}),
								object({
									"type": literal("image"),
									"attachment": object({
										"attachmentId": intersection(string(), unknown()),
										"mediaType": union([
											literal("image/png"),
											literal("image/jpeg"),
											literal("image/webp"),
											literal("image/gif")
										]),
										"bytes": number(),
										"width": number(),
										"height": number(),
										"name": union([_undefined(), string()]).optional(),
										"originalDimensions": union([_undefined(), object({
											"width": number(),
											"height": number()
										})]).optional()
									}),
									"offloaded": union([_undefined(), literal(true)]).optional()
								}),
								object({
									"type": literal("file"),
									"attachment": object({
										"attachmentId": intersection(string(), unknown()),
										"name": string(),
										"bytes": number()
									})
								}),
								object({
									"type": literal("tool-call"),
									"id": intersection(string(), unknown()),
									"name": string(),
									"arguments": string()
								}),
								object({
									"type": literal("tool-addition"),
									"toolName": string(),
									"tool": _undefined().optional()
								}),
								object({
									"type": literal("tool-removal"),
									"toolName": string()
								})
							]))
						}), object({
							"isError": boolean(),
							"error": union([_undefined(), object({
								"name": string(),
								"code": string(),
								"reason": union([_undefined(), string()]).optional()
							})]).optional()
						}))]).optional()
					})),
					"attemptSeqs": array(number()),
					"analysis": object({
						"status": union([
							literal("pending"),
							literal("succeeded"),
							literal("failed"),
							literal("cancelled"),
							literal("interrupted"),
							literal("unanalysed"),
							literal("stale"),
							literal("unavailable")
						]),
						"label": union([
							_undefined(),
							literal("input_parsing"),
							literal("problem_understanding"),
							literal("solution_planning"),
							literal("implementation"),
							literal("review_validation"),
							literal("delivery_finalization"),
							literal("mixed"),
							literal("unknown")
						]).optional(),
						"confidence": union([_undefined(), number()]).optional(),
						"probabilities": union([_undefined(), record(string(), number())]).optional(),
						"model": union([_undefined(), string()]).optional(),
						"configuredModel": union([_undefined(), string()]).optional(),
						"connectionId": union([
							_undefined(),
							literal("jev"),
							literal("luna-openrouter"),
							literal("luna-openai")
						]).optional(),
						"recordId": union([_undefined(), string()]).optional(),
						"operationId": union([_undefined(), string()]).optional(),
						"failure": union([_undefined(), object({
							"code": string(),
							"message": string()
						})]).optional(),
						"updatedAt": union([_undefined(), string()]).optional(),
						"previousResult": union([_undefined(), object({
							"recordId": string(),
							"label": union([
								literal("input_parsing"),
								literal("problem_understanding"),
								literal("solution_planning"),
								literal("implementation"),
								literal("review_validation"),
								literal("delivery_finalization"),
								literal("mixed"),
								literal("unknown")
							]),
							"stale": boolean(),
							"confidence": union([_undefined(), number()]).optional(),
							"probabilities": union([_undefined(), record(string(), number())]).optional(),
							"model": union([_undefined(), string()]).optional(),
							"configuredModel": union([_undefined(), string()]).optional(),
							"connectionId": union([
								_undefined(),
								literal("jev"),
								literal("luna-openrouter"),
								literal("luna-openai")
							]).optional(),
							"updatedAt": union([_undefined(), string()]).optional()
						})]).optional()
					})
				}))
			})),
			"batch": union([_undefined(), object({
				"id": string(),
				"sessionId": string(),
				"status": union([
					literal("failed"),
					literal("cancelled"),
					literal("completed"),
					literal("running")
				]),
				"total": number(),
				"completed": number(),
				"failed": number(),
				"cancelled": number(),
				"failure": union([_undefined(), object({
					"code": string(),
					"message": string()
				})]).optional()
			})]).optional()
		});
		let _dsh_jev_plugin_jev_listFeatures_result$schema$value;
		const _dsh_jev_plugin_jev_listFeatures_result$schema = () => _dsh_jev_plugin_jev_listFeatures_result$schema$value ??= array(object({
			"enabled": boolean(),
			"id": string(),
			"name": string(),
			"description": string(),
			"settingsDescription": union([_undefined(), string()]).optional()
		}));
		let _dsh_jev_plugin_jev_listRecords_parameter_0$schema$value;
		const _dsh_jev_plugin_jev_listRecords_parameter_0$schema = () => _dsh_jev_plugin_jev_listRecords_parameter_0$schema$value ??= object({
			"featureId": union([_undefined(), string()]).optional(),
			"status": union([
				_undefined(),
				literal("pending"),
				literal("waiting"),
				literal("succeeded"),
				literal("failed"),
				literal("cancelled"),
				literal("interrupted")
			]).optional(),
			"sessionId": union([_undefined(), string()]).optional(),
			"cursor": union([_undefined(), string()]).optional(),
			"limit": union([_undefined(), number()]).optional()
		});
		let _dsh_jev_plugin_jev_listRecords_result$schema$value;
		const _dsh_jev_plugin_jev_listRecords_result$schema = () => _dsh_jev_plugin_jev_listRecords_result$schema$value ??= object({
			"items": array(object({
				"id": string(),
				"featureId": string(),
				"sessionId": union([_undefined(), string()]).optional(),
				"status": union([
					literal("pending"),
					literal("waiting"),
					literal("succeeded"),
					literal("failed"),
					literal("cancelled"),
					literal("interrupted")
				]),
				"startedAt": string(),
				"updatedAt": string(),
				"attempts": number(),
				"actionStatus": union([
					_undefined(),
					literal("cancelled"),
					literal("unconfirmed"),
					literal("not-adopted"),
					literal("executed"),
					literal("execution-failed"),
					literal("observed")
				]).optional(),
				"diagnostic": boolean()
			})),
			"nextCursor": union([_undefined(), string()]).optional()
		});
		let _dsh_jev_plugin_jev_setCredential_parameter_0$schema$value;
		const _dsh_jev_plugin_jev_setCredential_parameter_0$schema = () => _dsh_jev_plugin_jev_setCredential_parameter_0$schema$value ??= object({
			"connectionId": union([
				literal("jev"),
				literal("luna-openrouter"),
				literal("luna-openai")
			]),
			"baseUrl": string(),
			"model": string(),
			"credentialRef": string(),
			"timeoutMs": number()
		});
		let _dsh_jev_plugin_jev_setCredential_parameter_1$schema$value;
		const _dsh_jev_plugin_jev_setCredential_parameter_1$schema = () => _dsh_jev_plugin_jev_setCredential_parameter_1$schema$value ??= string();
		let _dsh_jev_plugin_jev_setCredential_result$schema$value;
		const _dsh_jev_plugin_jev_setCredential_result$schema = () => _dsh_jev_plugin_jev_setCredential_result$schema$value ??= object({
			"connection": object({
				"connectionId": union([
					literal("jev"),
					literal("luna-openrouter"),
					literal("luna-openai")
				]),
				"baseUrl": string(),
				"model": string(),
				"credentialRef": string(),
				"timeoutMs": number()
			}),
			"configured": boolean(),
			"writable": boolean(),
			"source": union([_undefined(), string()]).optional()
		});
		let _dsh_jev_plugin_jev_startStageAnalysis_parameter_0$schema$value;
		const _dsh_jev_plugin_jev_startStageAnalysis_parameter_0$schema = () => _dsh_jev_plugin_jev_startStageAnalysis_parameter_0$schema$value ??= object({
			"sessionId": string(),
			"scope": union([object({
				"kind": literal("turn"),
				"turn": number()
			}), object({ "kind": literal("all") })]),
			"mode": union([
				literal("missing"),
				literal("retry-failed"),
				literal("refresh")
			])
		});
		let _dsh_jev_plugin_jev_startStageAnalysis_result$schema$value;
		const _dsh_jev_plugin_jev_startStageAnalysis_result$schema = () => _dsh_jev_plugin_jev_startStageAnalysis_result$schema$value ??= object({
			"id": string(),
			"sessionId": string(),
			"status": union([
				literal("failed"),
				literal("cancelled"),
				literal("completed"),
				literal("running")
			]),
			"total": number(),
			"completed": number(),
			"failed": number(),
			"cancelled": number(),
			"failure": union([_undefined(), object({
				"code": string(),
				"message": string()
			})]).optional()
		});
		let _dsh_jev_plugin_jev_testConnection_parameter_0$schema$value;
		const _dsh_jev_plugin_jev_testConnection_parameter_0$schema = () => _dsh_jev_plugin_jev_testConnection_parameter_0$schema$value ??= object({
			"connectionId": union([
				literal("jev"),
				literal("luna-openrouter"),
				literal("luna-openai")
			]),
			"baseUrl": string(),
			"model": string(),
			"credentialRef": string(),
			"timeoutMs": number()
		});
		let _dsh_jev_plugin_jev_testConnection_result$schema$value;
		const _dsh_jev_plugin_jev_testConnection_result$schema = () => _dsh_jev_plugin_jev_testConnection_result$schema$value ??= object({
			"connection": object({
				"connectionId": union([
					literal("jev"),
					literal("luna-openrouter"),
					literal("luna-openai")
				]),
				"baseUrl": string(),
				"model": string(),
				"credentialRef": string(),
				"timeoutMs": number()
			}),
			"ok": boolean(),
			"latencyMs": number(),
			"recordId": string(),
			"failure": union([_undefined(), object({
				"code": string(),
				"message": string()
			})]).optional()
		});
		const TYPERT_REMOTE = {
			package: "@dsh-jev/plugin",
			descriptors: [
				{
					id: "@dsh-jev/plugin#jev/cancelStageAnalysis",
					service: "jev",
					namespace: "jev",
					method: "cancelStageAnalysis",
					invocation: { kind: "direct" },
					parameters: [{
						name: "batchId",
						wire: "batchId",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@dsh-jev/plugin#jev/cancelStageAnalysis:batchId",
							create: _dsh_jev_plugin_jev_cancelStageAnalysis_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "@dsh-jev/plugin#jev/cancelStageAnalysis:result",
						create: _dsh_jev_plugin_jev_cancelStageAnalysis_result$schema
					},
					sourceLocation: {
						"file": "packages/jev/src/index.ts",
						"line": 222,
						"column": 3
					}
				},
				{
					id: "@dsh-jev/plugin#jev/getCredentialStatus",
					service: "jev",
					namespace: "jev",
					method: "getCredentialStatus",
					invocation: { kind: "direct" },
					parameters: [{
						name: "connection",
						wire: "connection",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@dsh-jev/plugin/types#JevConnectionIdentity",
							create: _dsh_jev_plugin_jev_getCredentialStatus_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "@dsh-jev/plugin/types#JevCredentialStatus",
						create: _dsh_jev_plugin_jev_getCredentialStatus_result$schema
					},
					sourceLocation: {
						"file": "packages/jev/src/index.ts",
						"line": 232,
						"column": 9
					}
				},
				{
					id: "@dsh-jev/plugin#jev/getRecord",
					service: "jev",
					namespace: "jev",
					method: "getRecord",
					invocation: { kind: "direct" },
					parameters: [{
						name: "id",
						wire: "id",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@dsh-jev/plugin#jev/getRecord:id",
							create: _dsh_jev_plugin_jev_getRecord_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "@dsh-jev/plugin#jev/getRecord:result",
						create: _dsh_jev_plugin_jev_getRecord_result$schema
					},
					sourceLocation: {
						"file": "packages/jev/src/index.ts",
						"line": 194,
						"column": 9
					}
				},
				{
					id: "@dsh-jev/plugin#jev/getStageAnalysisRecord",
					service: "jev",
					namespace: "jev",
					method: "getStageAnalysisRecord",
					invocation: { kind: "direct" },
					parameters: [
						{
							name: "sessionId",
							wire: "sessionId",
							source: "json",
							codec: {
								mode: "strict",
								typeSymbol: "@dsh-jev/plugin#jev/getStageAnalysisRecord:sessionId",
								create: _dsh_jev_plugin_jev_getStageAnalysisRecord_parameter_0$schema
							}
						},
						{
							name: "stepId",
							wire: "stepId",
							source: "json",
							codec: {
								mode: "strict",
								typeSymbol: "@dsh-jev/plugin#jev/getStageAnalysisRecord:stepId",
								create: _dsh_jev_plugin_jev_getStageAnalysisRecord_parameter_1$schema
							}
						},
						{
							name: "recordId",
							wire: "recordId",
							source: "json",
							acceptsUndefined: true,
							codec: {
								mode: "strict",
								typeSymbol: "@dsh-jev/plugin#jev/getStageAnalysisRecord:recordId",
								create: _dsh_jev_plugin_jev_getStageAnalysisRecord_parameter_2$schema
							}
						}
					],
					result: {
						mode: "strict",
						typeSymbol: "@dsh-jev/plugin#jev/getStageAnalysisRecord:result",
						create: _dsh_jev_plugin_jev_getStageAnalysisRecord_result$schema
					},
					sourceLocation: {
						"file": "packages/jev/src/index.ts",
						"line": 226,
						"column": 3
					}
				},
				{
					id: "@dsh-jev/plugin#jev/getStageNavigation",
					service: "jev",
					namespace: "jev",
					method: "getStageNavigation",
					invocation: { kind: "direct" },
					parameters: [{
						name: "sessionId",
						wire: "sessionId",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@dsh-jev/plugin#jev/getStageNavigation:sessionId",
							create: _dsh_jev_plugin_jev_getStageNavigation_parameter_0$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "@dsh-jev/plugin/stage-types#StageNavigationSnapshot",
						create: _dsh_jev_plugin_jev_getStageNavigation_result$schema
					},
					sourceLocation: {
						"file": "packages/jev/src/index.ts",
						"line": 210,
						"column": 3
					}
				},
				{
					id: "@dsh-jev/plugin#jev/listFeatures",
					service: "jev",
					namespace: "jev",
					method: "listFeatures",
					invocation: { kind: "direct" },
					parameters: [],
					result: {
						mode: "strict",
						typeSymbol: "@dsh-jev/plugin#jev/listFeatures:result",
						create: _dsh_jev_plugin_jev_listFeatures_result$schema
					},
					sourceLocation: {
						"file": "packages/jev/src/index.ts",
						"line": 178,
						"column": 9
					}
				},
				{
					id: "@dsh-jev/plugin#jev/listRecords",
					service: "jev",
					namespace: "jev",
					method: "listRecords",
					invocation: { kind: "direct" },
					parameters: [{
						name: "filter",
						wire: "filter",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@dsh-jev/plugin/types#JevRecordFilter",
							create: _dsh_jev_plugin_jev_listRecords_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "@dsh-jev/plugin/types#JevRecordPage",
						create: _dsh_jev_plugin_jev_listRecords_result$schema
					},
					sourceLocation: {
						"file": "packages/jev/src/index.ts",
						"line": 185,
						"column": 9
					}
				},
				{
					id: "@dsh-jev/plugin#jev/setCredential",
					service: "jev",
					namespace: "jev",
					method: "setCredential",
					invocation: { kind: "direct" },
					parameters: [{
						name: "connection",
						wire: "connection",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@dsh-jev/plugin/types#JevConnectionIdentity",
							create: _dsh_jev_plugin_jev_setCredential_parameter_0$schema
						}
					}, {
						name: "value",
						wire: "value",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@dsh-jev/plugin#jev/setCredential:value",
							create: _dsh_jev_plugin_jev_setCredential_parameter_1$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "@dsh-jev/plugin/types#JevCredentialStatus",
						create: _dsh_jev_plugin_jev_setCredential_result$schema
					},
					sourceLocation: {
						"file": "packages/jev/src/index.ts",
						"line": 240,
						"column": 9
					}
				},
				{
					id: "@dsh-jev/plugin#jev/startStageAnalysis",
					service: "jev",
					namespace: "jev",
					method: "startStageAnalysis",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@dsh-jev/plugin/stage-types#StageAnalysisRequest",
							create: _dsh_jev_plugin_jev_startStageAnalysis_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "@dsh-jev/plugin/stage-types#StageBatchState",
						create: _dsh_jev_plugin_jev_startStageAnalysis_result$schema
					},
					sourceLocation: {
						"file": "packages/jev/src/index.ts",
						"line": 216,
						"column": 3
					}
				},
				{
					id: "@dsh-jev/plugin#jev/testConnection",
					service: "jev",
					namespace: "jev",
					method: "testConnection",
					invocation: { kind: "direct" },
					parameters: [{
						name: "connection",
						wire: "connection",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "@dsh-jev/plugin/types#JevConnectionIdentity",
							create: _dsh_jev_plugin_jev_testConnection_parameter_0$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "@dsh-jev/plugin/types#JevProbeResult",
						create: _dsh_jev_plugin_jev_testConnection_result$schema
					},
					sourceLocation: {
						"file": "packages/jev/src/index.ts",
						"line": 250,
						"column": 9
					}
				}
			]
		};
		//#endregion
		//#region src/mcp-selection-types.ts
		/** Naming convention only, never an authenticated server/raw-tool identity. */
		const MCP_PUBLIC_NAME_PATTERN = /^(?=.{1,64}$)mcp__[A-Za-z0-9_-]+__[A-Za-z0-9_-]+$/;
		function isMcpPublicName(name) {
			return MCP_PUBLIC_NAME_PATTERN.test(name);
		}
		//#endregion
//#region jev-css:JevPage.module.css
		const tag$1 = "@dsh-jev/plugin/src/client/JevPage.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tag$1) + "]") === null) {
			const element = document.createElement("style");
			element.dataset.plugin = "@dsh-jev/plugin";
			element.dataset.pluginCss = tag$1;
			element.textContent = ".kZ-dVa_page{min-width:0;color:var(--dsw-alias-label-primary);flex-direction:column;gap:24px;padding:12px 0 24px;font-size:13px;line-height:20px;display:flex}.kZ-dVa_tabs{max-width:420px}.kZ-dVa_panel,.kZ-dVa_section,.kZ-dVa_form,.kZ-dVa_list,.kZ-dVa_record,.kZ-dVa_detail,.kZ-dVa_featureBody{flex-direction:column;display:flex}.kZ-dVa_panel{gap:24px}.kZ-dVa_section{gap:12px}.kZ-dVa_form{gap:14px}.kZ-dVa_list,.kZ-dVa_record{gap:8px}.kZ-dVa_detail{gap:12px}.kZ-dVa_featureBody{gap:2px;min-width:0}.kZ-dVa_heading{margin:0;font-size:14px;font-weight:500;line-height:22px}.kZ-dVa_row,.kZ-dVa_toolbar,.kZ-dVa_feature,.kZ-dVa_recordHead,.kZ-dVa_filters,.kZ-dVa_actions{align-items:center;gap:12px;display:flex}.kZ-dVa_feature,.kZ-dVa_recordHead{justify-content:space-between}.kZ-dVa_feature,.kZ-dVa_record{border:1px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-md);padding:12px}.kZ-dVa_featureTitle{font-weight:500}.kZ-dVa_description,.kZ-dVa_hint,.kZ-dVa_meta,.kZ-dVa_empty{color:var(--dsw-alias-label-secondary)}.kZ-dVa_description,.kZ-dVa_hint,.kZ-dVa_meta,.kZ-dVa_empty,.kZ-dVa_notice{margin:0}.kZ-dVa_hint{font-size:12px}.kZ-dVa_empty{padding:12px 0}.kZ-dVa_loading{justify-content:center;align-items:center;min-height:80px;display:flex}.kZ-dVa_toolbar,.kZ-dVa_actions{flex-wrap:wrap}.kZ-dVa_filters{flex-wrap:wrap;align-items:end}.kZ-dVa_field{flex-direction:column;flex:160px;gap:6px;min-width:0;display:flex}.kZ-dVa_field>span:first-child,.kZ-dVa_field>label{font-weight:500}.kZ-dVa_field input,.kZ-dVa_field select{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-bg-layer-2);width:100%;min-height:36px;color:var(--dsw-alias-label-primary);font:inherit;padding:6px 10px}.kZ-dVa_field input:focus-visible,.kZ-dVa_field select:focus-visible{outline:var(--dsw-focus-ring-width)solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:1px}.kZ-dVa_field input[aria-invalid=true]{border-color:var(--dsw-alias-state-error-primary)}.kZ-dVa_notice{color:var(--dsw-alias-state-error-primary);font-size:13px}.kZ-dVa_success{color:var(--dsw-alias-state-success-primary)}.kZ-dVa_code{border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);white-space:pre-wrap;overflow-wrap:anywhere;margin:0;padding:10px;font-size:12px;line-height:18px;overflow:auto}.kZ-dVa_detailBlock{flex-direction:column;gap:6px;display:flex}.kZ-dVa_detailLabel{font-weight:500}@media (width<=600px){.kZ-dVa_feature,.kZ-dVa_recordHead{flex-direction:column;align-items:flex-start}.kZ-dVa_filters>.kZ-dVa_field{flex-basis:100%}}";
			document.head.appendChild(element);
		}
		var JevPage_module_css_default = {
			"actions": "kZ-dVa_actions",
			"code": "kZ-dVa_code",
			"description": "kZ-dVa_description",
			"detail": "kZ-dVa_detail",
			"detailBlock": "kZ-dVa_detailBlock",
			"detailLabel": "kZ-dVa_detailLabel",
			"empty": "kZ-dVa_empty",
			"feature": "kZ-dVa_feature",
			"featureBody": "kZ-dVa_featureBody",
			"featureTitle": "kZ-dVa_featureTitle",
			"field": "kZ-dVa_field",
			"filters": "kZ-dVa_filters",
			"form": "kZ-dVa_form",
			"heading": "kZ-dVa_heading",
			"hint": "kZ-dVa_hint",
			"list": "kZ-dVa_list",
			"loading": "kZ-dVa_loading",
			"meta": "kZ-dVa_meta",
			"notice": "kZ-dVa_notice",
			"page": "kZ-dVa_page",
			"panel": "kZ-dVa_panel",
			"record": "kZ-dVa_record",
			"recordHead": "kZ-dVa_recordHead",
			"row": "kZ-dVa_row",
			"section": "kZ-dVa_section",
			"success": "kZ-dVa_success",
			"tabs": "kZ-dVa_tabs",
			"toolbar": "kZ-dVa_toolbar"
		};
		//#endregion
		//#region src/client/McpSelectionSettings.tsx
		/** Profile-scoped native MCP definition selection; saving never enables the feature. */
		const FIELDS = [
			{
				key: "toolLimit",
				label: "mcpToolLimit",
				error: "mcpToolLimitInvalid",
				min: 0,
				max: 1e3
			},
			{
				key: "minProbability",
				label: "mcpMinProbability",
				error: "mcpProbabilityInvalid",
				min: 0,
				max: 1,
				ratio: true
			},
			{
				key: "waitMs",
				label: "mcpWaitMs",
				error: "mcpWaitInvalid",
				min: 1,
				max: 3e5
			},
			{
				key: "maxRequestChars",
				label: "mcpMaxRequestChars",
				error: "mcpRequestInvalid",
				min: 2048,
				max: 1e6
			}
		];
		function toDraft(value) {
			return {
				toolLimit: String(value.toolLimit),
				minProbability: String(value.minProbability),
				waitMs: String(value.waitMs),
				maxRequestChars: String(value.maxRequestChars),
				allowZero: value.allowZero,
				pinnedTools: value.pinnedTools.join("\n")
			};
		}
		/** Render the independent MCP configuration using the incumbent settings controls. */
		function McpSelectionSettings({ form, notifySuccess, t }) {
			const subscribe = (0, react.useCallback)((listener) => form.subscribe(listener), [form]);
			const getSnapshot = (0, react.useCallback)(() => form.getSnapshot(), [form]);
			const snapshot = (0, react.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
			const [draft, setDraft] = (0, react.useState)(null);
			const [invalid, setInvalid] = (0, react.useState)({});
			const [saving, setSaving] = (0, react.useState)(false);
			const [saveError, setSaveError] = (0, react.useState)(false);
			const edited = (0, react.useRef)(false);
			const pending = (0, react.useRef)(false);
			const current = snapshot.value;
			(0, react.useEffect)(() => {
				if (current !== void 0 && !edited.current) setDraft(toDraft(current));
			}, [current]);
			const values = draft ?? (current === void 0 ? null : toDraft(current));
			const dirty = current !== void 0 && values !== null && JSON.stringify(values) !== JSON.stringify(toDraft(current));
			(0, react.useEffect)(() => {
				if (!dirty) edited.current = false;
			}, [dirty]);
			const disabled = !snapshot.writable || snapshot.status !== "ready" || saving;
			const edit = (key, value) => {
				if (values === null) return;
				edited.current = true;
				setDraft({
					...values,
					[key]: value
				});
				setInvalid((previous) => {
					const next = { ...previous };
					delete next[key];
					if (key === "toolLimit") delete next.allowZero;
					return next;
				});
				setSaveError(false);
			};
			const save = async () => {
				if (values === null || disabled || !dirty || pending.current) return;
				const errors = {};
				const numeric = {};
				for (const { key, min, max, ratio, error } of FIELDS) {
					const raw = values[key];
					const value = Number(raw);
					if (raw.trim() === "" || !Number.isFinite(value) || value < min || value > max || !ratio && (!/^\d+$/.test(raw) || !Number.isSafeInteger(value))) errors[key] = error;
					else numeric[key] = value;
				}
				const pinnedTools = [...new Set(values.pinnedTools.split(/\r?\n/).map((name) => name.trim()).filter(Boolean))];
				if (pinnedTools.some((name) => !isMcpPublicName(name))) errors.pinnedTools = "mcpPinsInvalid";
				if (numeric.toolLimit === 0 && !values.allowZero) errors.allowZero = "mcpZeroInvalid";
				setInvalid(errors);
				if (Object.keys(errors).length) return;
				pending.current = true;
				setSaving(true);
				setSaveError(false);
				try {
					if (!await form.mutate([
						...FIELDS.map(({ key }) => ({
							op: "set",
							path: [key],
							value: numeric[key]
						})),
						{
							op: "set",
							path: ["allowZero"],
							value: values.allowZero
						},
						{
							op: "set",
							path: ["pinnedTools"],
							value: pinnedTools
						}
					], snapshot.revision)) setSaveError(true);
					else {
						edited.current = false;
						const saved = form.getSnapshot().value;
						if (saved !== void 0) setDraft(toDraft(saved));
						notifySuccess(t("mcpSelectionSaved"));
					}
				} catch {
					setSaveError(true);
				} finally {
					pending.current = false;
					setSaving(false);
				}
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: JevPage_module_css_default.section,
				"aria-label": t("mcpSelectionSettings"),
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
						className: JevPage_module_css_default.heading,
						children: t("mcpSelectionSettings")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: JevPage_module_css_default.hint,
						children: t("mcpSelectionHint")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: JevPage_module_css_default.hint,
						id: "jev-mcp-budget-hint",
						children: t("mcpSelectionBudgetHint")
					}),
					snapshot.status === "loading" && current === void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: JevPage_module_css_default.loading,
						role: "status",
						"aria-label": t("loading"),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.StateDot, {
							state: "ongoing",
							size: 24
						})
					}),
					snapshot.status === "unavailable" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: JevPage_module_css_default.notice,
						children: t("unavailable")
					}),
					current !== void 0 && values !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: JevPage_module_css_default.form,
						"aria-busy": saving,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: JevPage_module_css_default.filters,
								children: FIELDS.map(({ key, label, min, max, ratio }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: JevPage_module_css_default.field,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
											htmlFor: `jev-mcp-${key}`,
											children: t(label)
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											id: `jev-mcp-${key}`,
											type: "number",
											min,
											max,
											step: ratio ? "any" : "1",
											value: values[key],
											disabled,
											"aria-invalid": Boolean(invalid[key]) || void 0,
											"aria-describedby": invalid[key] ? `jev-mcp-${key}-error` : key === "toolLimit" ? "jev-mcp-budget-hint" : void 0,
											onChange: (event) => {
												edit(key, event.target.value);
											}
										}),
										invalid[key] && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											id: `jev-mcp-${key}-error`,
											role: "alert",
											className: JevPage_module_css_default.notice,
											children: t(invalid[key])
										})
									]
								}, key))
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: JevPage_module_css_default.row,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Switch, {
									label: t("mcpAllowZero"),
									checked: values.allowZero,
									disabled,
									onChange: (value) => {
										edit("allowZero", value);
									}
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("mcpAllowZero") })]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: JevPage_module_css_default.hint,
								children: t("mcpAllowZeroHint")
							}),
							invalid.allowZero && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								role: "alert",
								className: JevPage_module_css_default.notice,
								children: t(invalid.allowZero)
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: JevPage_module_css_default.filters,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: JevPage_module_css_default.field,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
											htmlFor: "jev-mcp-pinnedTools",
											children: t("mcpPinnedTools")
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
											id: "jev-mcp-pinnedTools",
											rows: 4,
											value: values.pinnedTools,
											disabled,
											"aria-invalid": Boolean(invalid.pinnedTools) || void 0,
											"aria-describedby": `jev-mcp-pins-hint${invalid.pinnedTools ? " jev-mcp-pins-error" : ""}`,
											onChange: (event) => {
												edit("pinnedTools", event.target.value);
											},
											style: {
												width: "100%",
												boxSizing: "border-box",
												minHeight: 96,
												padding: "6px 10px",
												border: `1px solid var(${invalid.pinnedTools ? "--dsw-alias-state-error-primary" : "--dsw-alias-border-l3"})`,
												borderRadius: "var(--dsw-radius-sm)",
												background: "var(--dsw-alias-bg-layer-2)",
												color: "var(--dsw-alias-label-primary)",
												font: "inherit",
												resize: "vertical"
											}
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
											id: "jev-mcp-pins-hint",
											className: JevPage_module_css_default.hint,
											children: t("mcpPinnedToolsHint")
										}),
										invalid.pinnedTools && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											id: "jev-mcp-pins-error",
											role: "alert",
											className: JevPage_module_css_default.notice,
											children: t(invalid.pinnedTools)
										})
									]
								})
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: JevPage_module_css_default.actions,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "primary",
									disabled: disabled || !dirty,
									onClick: () => {
										save();
									},
									children: saving ? t("saving") : t("saveMcpSelection")
								}), !snapshot.writable && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: JevPage_module_css_default.hint,
									children: t("readOnly")
								})]
							}),
							saveError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								role: "alert",
								className: JevPage_module_css_default.notice,
								children: t("mcpSelectionSaveFailed")
							})
						]
					})
				]
			});
		}
		//#endregion
		//#region src/types.ts
		/** Resolve the explicitly selected protocol; custom URLs do not change its identity. */
		function resolveConnectionIdentity(values, id) {
			const connectionId = id ?? (values.judgmentModel === "luna" ? `luna-${values.lunaApi}` : "jev");
			const baseUrl = connectionId === "jev" ? values.baseUrl : connectionId === "luna-openrouter" ? values.lunaOpenRouterBaseUrl : values.lunaOpenAIBaseUrl;
			let safeUrl = "";
			try {
				const url = new URL(baseUrl.trim());
				if ((url.protocol === "https:" || url.protocol === "http:") && !url.username && !url.password && !url.search && !url.hash) safeUrl = url.toString();
			} catch {}
			return {
				connectionId,
				baseUrl: safeUrl,
				model: connectionId === "jev" ? values.model.trim() : connectionId === "luna-openrouter" ? "openai/gpt-6-luna-decisions" : "gpt-6-luna",
				credentialRef: (connectionId === "jev" ? values.credentialRef : connectionId === "luna-openrouter" ? values.lunaOpenRouterCredentialRef : values.lunaOpenAICredentialRef).trim(),
				timeoutMs: values.timeoutMs
			};
		}
		//#endregion
		//#region src/client/JevPage.tsx
		/** Jev bundle settings, feature catalogue, and bounded decision-record browser. */
		function featureName(feature, t) {
			if (feature.id === "shared-findings") return t("sharedFindingsName");
			if (feature.id === "stage-navigation") return t("stageNavigationName");
			if (feature.id === "mcp-selection") return t("mcpSelectionName");
			return feature.name;
		}
		function featureDescription(feature, t) {
			if (feature.id === "shared-findings") return t("sharedFindingsDescription");
			if (feature.id === "stage-navigation") return t("stageNavigationDescription");
			if (feature.id === "mcp-selection") return t("mcpSelectionDescription");
			return feature.description;
		}
		function recordFeatureName(features, featureId, t) {
			const feature = features.find((entry) => entry.id === featureId);
			return feature ? featureName(feature, t) : featureId;
		}
		const STATUSES = [
			"pending",
			"waiting",
			"succeeded",
			"failed",
			"cancelled",
			"interrupted"
		];
		const PAGE_SIZE = 25;
		function statusLabel(status, t) {
			return t(status);
		}
		function actionStatusLabel(status, t) {
			return t({
				unconfirmed: "unconfirmed",
				"not-adopted": "notAdopted",
				cancelled: "cancelled",
				executed: "executed",
				"execution-failed": "executionFailed",
				observed: "observed"
			}[status]);
		}
		function dateText(value) {
			const date = new Date(value);
			return Number.isNaN(date.valueOf()) ? value : date.toLocaleString();
		}
		function JsonDetail({ value }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
				className: JevPage_module_css_default.code,
				children: JSON.stringify(value, null, 2)
			});
		}
		function DetailBlock({ label, value }) {
			if (value === void 0) return null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: JevPage_module_css_default.detailBlock,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: JevPage_module_css_default.detailLabel,
					children: label
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(JsonDetail, { value })]
			});
		}
		function Loading({ label }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: JevPage_module_css_default.loading,
				role: "status",
				"aria-label": label,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.StateDot, {
					state: "ongoing",
					size: 24
				})
			});
		}
		/** Render one plugin-owned page inside the Host Plugins bundle detail. */
		function JevPage(props) {
			const [tab, setTab] = (0, react.useState)("settings");
			const t = props.t;
			if (props.view !== "page") return null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: JevPage_module_css_default.page,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.SegmentedTabs, {
					label: t("tabs"),
					items: [{
						value: "settings",
						label: t("settings"),
						id: "jev-settings-tab",
						panelId: "jev-settings-panel"
					}, {
						value: "records",
						label: t("records"),
						id: "jev-records-tab",
						panelId: "jev-records-panel"
					}],
					value: tab,
					onChange: setTab,
					className: JevPage_module_css_default.tabs
				}), tab === "settings" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					id: "jev-settings-panel",
					role: "tabpanel",
					"aria-labelledby": "jev-settings-tab",
					className: JevPage_module_css_default.panel,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SettingsPanel, {
							form: props.form,
							jev: props.jev,
							notifySuccess: props.notifySuccess,
							t
						}),
						props.supervisionForm && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SupervisionSettings, {
							form: props.supervisionForm,
							notifySuccess: props.notifySuccess,
							t
						}),
						props.selectionForm && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectionSettings, {
							form: props.selectionForm,
							notifySuccess: props.notifySuccess,
							t
						}),
						props.mcpSelectionForm && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(McpSelectionSettings, {
							form: props.mcpSelectionForm,
							notifySuccess: props.notifySuccess,
							t
						}),
						props.outputAdmissionForm && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(OutputAdmissionSettings, {
							form: props.outputAdmissionForm,
							notifySuccess: props.notifySuccess,
							t
						}),
						props.stageNavigationForm && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StageNavigationSettings, {
							form: props.stageNavigationForm,
							notifySuccess: props.notifySuccess,
							t
						})
					]
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					id: "jev-records-panel",
					role: "tabpanel",
					"aria-labelledby": "jev-records-tab",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RecordsPanel, {
						jev: props.jev,
						t
					})
				})]
			});
		}
		const SELECTION_FIELDS = [
			{
				key: "skillLimit",
				label: "skillSummaryCount"
			},
			{
				key: "skillMinProbability",
				label: "skillMinProbability",
				ratio: true
			},
			{
				key: "fileCandidates",
				label: "fileRankingMaximum"
			},
			{
				key: "fileLimit",
				label: "rankedPathCount"
			}
		];
		function selectionDraft(value) {
			return Object.fromEntries(SELECTION_FIELDS.map(({ key }) => [key, String(value[key])]));
		}
		function parseRatio(value) {
			if (value.trim() === "") return null;
			const parsed = Number(value);
			return Number.isFinite(parsed) && parsed >= 0 && parsed <= 1 ? parsed : null;
		}
		function parsePositiveInteger(value) {
			if (!/^[1-9]\d*$/.test(value)) return null;
			const parsed = Number(value);
			return Number.isSafeInteger(parsed) ? parsed : null;
		}
		const OUTPUT_FIELDS = [
			{
				key: "generalMinChars",
				label: "generalMinChars"
			},
			{
				key: "testMinChars",
				label: "testMinChars"
			},
			{
				key: "generalBlockChars",
				label: "generalBlockChars"
			},
			{
				key: "maxGeneralBlocks",
				label: "maxGeneralBlocks"
			},
			{
				key: "maxTestCandidates",
				label: "maxTestCandidates"
			},
			{
				key: "maxRequestChars",
				label: "maxRequestChars"
			},
			{
				key: "maxTaskChars",
				label: "maxTaskChars"
			},
			{
				key: "waitMs",
				label: "admissionWaitMs"
			},
			{
				key: "omitProbability",
				label: "omitProbability",
				ratio: true
			},
			{
				key: "minSavedChars",
				label: "minSavedChars"
			},
			{
				key: "minSavedRatio",
				label: "minSavedRatio",
				ratio: true
			},
			{
				key: "slowTestMs",
				label: "slowTestMs"
			},
			{
				key: "duplicateMinLines",
				label: "duplicateMinLines"
			},
			{
				key: "duplicateMinChars",
				label: "duplicateMinChars"
			}
		];
		function OutputAdmissionSettings({ form, notifySuccess, t }) {
			const subscribe = (0, react.useCallback)((listener) => form.subscribe(listener), [form]);
			const getSnapshot = (0, react.useCallback)(() => form.getSnapshot(), [form]);
			const snapshot = (0, react.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
			const [draft, setDraft] = (0, react.useState)({});
			const [invalid, setInvalid] = (0, react.useState)([]);
			const [saving, setSaving] = (0, react.useState)(false);
			const [saveError, setSaveError] = (0, react.useState)(false);
			const edited = (0, react.useRef)(false);
			const observed = (0, react.useRef)("");
			(0, react.useEffect)(() => {
				if (snapshot.value === void 0) return;
				const values = Object.fromEntries(OUTPUT_FIELDS.map(({ key }) => [key, String(snapshot.value[key])]));
				const signature = JSON.stringify(values);
				if (signature === observed.current) return;
				observed.current = signature;
				if (!edited.current) setDraft(values);
			}, [snapshot.value]);
			const current = snapshot.value;
			const dirty = current !== void 0 && OUTPUT_FIELDS.some(({ key }) => draft[key] !== void 0 && draft[key] !== String(current[key]));
			(0, react.useEffect)(() => {
				if (!dirty) edited.current = false;
			}, [dirty]);
			const save = async () => {
				const errors = [];
				const values = {};
				for (const { key, ratio } of OUTPUT_FIELDS) {
					const raw = draft[key] ?? "";
					const value = ratio ? Number(raw) : parsePositiveInteger(raw);
					if (raw.trim() === "" || value === null || !Number.isFinite(value) || ratio && (value < 0 || value > 1)) errors.push(key);
					else values[key] = value;
				}
				if (errors.length) {
					setInvalid(errors);
					return;
				}
				setSaving(true);
				setSaveError(false);
				try {
					if (!await form.mutate(OUTPUT_FIELDS.map(({ key }) => ({
						op: "set",
						path: [key],
						value: values[key]
					})), snapshot.revision)) setSaveError(true);
					else {
						edited.current = false;
						notifySuccess(t("outputAdmissionSaved"));
					}
				} catch {
					setSaveError(true);
				} finally {
					setSaving(false);
				}
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: JevPage_module_css_default.section,
				"aria-label": t("outputAdmissionSettings"),
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
						className: JevPage_module_css_default.heading,
						children: t("outputAdmissionSettings")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: JevPage_module_css_default.hint,
						children: t("outputAdmissionHint")
					}),
					snapshot.status === "loading" && current === void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Loading, { label: t("loading") }),
					snapshot.status === "unavailable" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: JevPage_module_css_default.notice,
						children: t("unavailable")
					}),
					current !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: JevPage_module_css_default.form,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: JevPage_module_css_default.filters,
								children: OUTPUT_FIELDS.map(({ key, label, ratio }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: JevPage_module_css_default.field,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
											htmlFor: `jev-output-${key}`,
											children: t(label)
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											id: `jev-output-${key}`,
											type: "number",
											min: ratio ? "0" : "1",
											max: ratio ? "1" : void 0,
											step: ratio ? "any" : "1",
											value: draft[key] ?? String(current[key]),
											"aria-invalid": invalid.includes(key) || void 0,
											disabled: !snapshot.writable || saving,
											onChange: (event) => {
												edited.current = true;
												setDraft((previous) => ({
													...previous,
													[key]: event.target.value
												}));
												setInvalid((previous) => previous.filter((item) => item !== key));
											}
										}),
										invalid.includes(key) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											role: "alert",
											className: JevPage_module_css_default.notice,
											children: t("outputAdmissionInvalid")
										})
									]
								}, key))
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: JevPage_module_css_default.actions,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "primary",
									disabled: !snapshot.writable || saving || !dirty,
									onClick: () => {
										save();
									},
									children: saving ? t("saving") : t("saveOutputAdmission")
								})
							}),
							saveError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								role: "alert",
								className: JevPage_module_css_default.notice,
								children: t("outputAdmissionSaveFailed")
							})
						]
					})
				]
			});
		}
		const STAGE_FIELDS = [
			{
				key: "previousSteps",
				label: "previousSteps",
				min: 0,
				max: 20
			},
			{
				key: "previousChars",
				label: "previousChars",
				min: 0,
				max: 1e5
			},
			{
				key: "maxRequestChars",
				label: "stageMaxRequestChars",
				min: 2048,
				max: 1e7
			},
			{
				key: "concurrency",
				label: "stageConcurrency",
				min: 1,
				max: 8
			}
		];
		function StageNavigationSettings({ form, notifySuccess, t }) {
			const subscribe = (0, react.useCallback)((listener) => form.subscribe(listener), [form]);
			const getSnapshot = (0, react.useCallback)(() => form.getSnapshot(), [form]);
			const snapshot = (0, react.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
			const [draft, setDraft] = (0, react.useState)({});
			const [invalid, setInvalid] = (0, react.useState)([]);
			const [saving, setSaving] = (0, react.useState)(false);
			const [saveError, setSaveError] = (0, react.useState)(false);
			const edited = (0, react.useRef)(false);
			const observed = (0, react.useRef)("");
			(0, react.useEffect)(() => {
				if (snapshot.value === void 0) return;
				const values = {
					previousSteps: String(snapshot.value.previousSteps),
					previousChars: String(snapshot.value.previousChars),
					maxRequestChars: String(snapshot.value.maxRequestChars),
					concurrency: String(snapshot.value.concurrency)
				};
				const signature = JSON.stringify(values);
				if (signature === observed.current) return;
				observed.current = signature;
				if (!edited.current) setDraft(values);
			}, [snapshot.value]);
			const current = snapshot.value;
			const dirty = current !== void 0 && STAGE_FIELDS.some(({ key }) => draft[key] !== void 0 && draft[key] !== String(current[key]));
			(0, react.useEffect)(() => {
				if (!dirty) edited.current = false;
			}, [dirty]);
			const save = async () => {
				const errors = [];
				const values = {};
				for (const { key, min, max } of STAGE_FIELDS) {
					const raw = draft[key] ?? "";
					const value = Number(raw);
					if (!/^\d+$/.test(raw) || !Number.isSafeInteger(value) || value < min || value > max) errors.push(key);
					else values[key] = value;
				}
				if (errors.length > 0) {
					setInvalid(errors);
					return;
				}
				setSaving(true);
				setSaveError(false);
				try {
					if (!await form.mutate(STAGE_FIELDS.map(({ key }) => ({
						op: "set",
						path: [key],
						value: values[key]
					})), snapshot.revision)) setSaveError(true);
					else {
						edited.current = false;
						notifySuccess(t("stageSaved"));
					}
				} catch {
					setSaveError(true);
				} finally {
					setSaving(false);
				}
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: JevPage_module_css_default.section,
				"aria-label": t("stageSettings"),
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
						className: JevPage_module_css_default.heading,
						children: t("stageSettings")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: JevPage_module_css_default.hint,
						children: t("stageSettingsHint")
					}),
					snapshot.status === "loading" && current === void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Loading, { label: t("loading") }),
					snapshot.status === "unavailable" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: JevPage_module_css_default.notice,
						children: t("unavailable")
					}),
					current !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: JevPage_module_css_default.form,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: JevPage_module_css_default.filters,
								children: STAGE_FIELDS.map(({ key, label, min, max }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: JevPage_module_css_default.field,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
											htmlFor: `jev-stage-${key}`,
											children: t(label)
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											id: `jev-stage-${key}`,
											type: "number",
											min,
											max,
											step: "1",
											value: draft[key] ?? String(current[key]),
											"aria-invalid": invalid.includes(key) || void 0,
											disabled: !snapshot.writable || saving,
											onChange: (event) => {
												edited.current = true;
												setDraft((previous) => ({
													...previous,
													[key]: event.target.value
												}));
												setInvalid((previous) => previous.filter((item) => item !== key));
											}
										}),
										invalid.includes(key) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											role: "alert",
											className: JevPage_module_css_default.notice,
											children: t("stageInvalid")
										})
									]
								}, key))
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: JevPage_module_css_default.actions,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "primary",
									disabled: !snapshot.writable || saving || !dirty,
									onClick: () => {
										save();
									},
									children: saving ? t("saving") : t("saveStageSettings")
								})
							}),
							saveError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								role: "alert",
								className: JevPage_module_css_default.notice,
								children: t("stageSaveFailed")
							})
						]
					})
				]
			});
		}
		function SelectionSettings({ form, notifySuccess, t }) {
			const subscribe = (0, react.useCallback)((listener) => form.subscribe(listener), [form]);
			const getSnapshot = (0, react.useCallback)(() => form.getSnapshot(), [form]);
			const snapshot = (0, react.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
			const [draft, setDraft] = (0, react.useState)({
				skillLimit: "",
				skillMinProbability: "",
				fileCandidates: "",
				fileLimit: ""
			});
			const [errors, setErrors] = (0, react.useState)({});
			const [saveError, setSaveError] = (0, react.useState)(false);
			const [saving, setSaving] = (0, react.useState)(false);
			const [hydrated, setHydrated] = (0, react.useState)(false);
			const edited = (0, react.useRef)(false);
			const observed = (0, react.useRef)("");
			(0, react.useEffect)(() => {
				if (snapshot.value === void 0) return;
				const next = selectionDraft(snapshot.value);
				const signature = JSON.stringify(next);
				if (signature === observed.current) return;
				observed.current = signature;
				if (!edited.current) setDraft(next);
				setHydrated(true);
			}, [snapshot.value]);
			const current = snapshot.value;
			const dirty = hydrated && current !== void 0 && SELECTION_FIELDS.some(({ key }) => draft[key] !== String(current[key]));
			(0, react.useEffect)(() => {
				if (!dirty) edited.current = false;
			}, [dirty]);
			const edit = (key, value) => {
				edited.current = true;
				setDraft((previous) => ({
					...previous,
					[key]: value
				}));
				setErrors((previous) => ({
					...previous,
					[key]: false
				}));
				setSaveError(false);
			};
			const save = async () => {
				const parsed = {};
				const nextErrors = {};
				for (const { key, ratio } of SELECTION_FIELDS) {
					const value = ratio ? parseRatio(draft[key]) : parsePositiveInteger(draft[key]);
					if (value === null) nextErrors[key] = true;
					else parsed[key] = value;
				}
				if (Object.keys(nextErrors).length > 0) {
					setErrors(nextErrors);
					return;
				}
				setSaving(true);
				setSaveError(false);
				try {
					if (await form.mutate(SELECTION_FIELDS.map(({ key }) => ({
						op: "set",
						path: [key],
						value: parsed[key]
					})), snapshot.revision)) {
						const saved = form.getSnapshot().value;
						if (saved !== void 0) {
							setDraft(selectionDraft(saved));
							edited.current = false;
						}
						notifySuccess(t("selectionCountSaved"));
					} else setSaveError(true);
				} catch {
					setSaveError(true);
				} finally {
					setSaving(false);
				}
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: JevPage_module_css_default.section,
				"aria-label": t("selectionCounts"),
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
						className: JevPage_module_css_default.heading,
						children: t("selectionCounts")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: JevPage_module_css_default.hint,
						children: t("selectionCountsHint")
					}),
					snapshot.status === "loading" && current === void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Loading, { label: t("loading") }),
					snapshot.status === "unavailable" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: JevPage_module_css_default.notice,
						children: t("unavailable")
					}),
					current !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: JevPage_module_css_default.form,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: JevPage_module_css_default.filters,
								children: SELECTION_FIELDS.map(({ key, label, ratio }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: JevPage_module_css_default.field,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
											htmlFor: `jev-selection-${key}`,
											children: t(label)
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											id: `jev-selection-${key}`,
											type: "text",
											inputMode: ratio ? "decimal" : "numeric",
											value: draft[key],
											"aria-invalid": errors[key] || void 0,
											"aria-describedby": errors[key] ? `jev-selection-${key}-error` : void 0,
											disabled: !snapshot.writable || saving,
											onChange: (event) => {
												edit(key, event.target.value);
											}
										}),
										errors[key] && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											id: `jev-selection-${key}-error`,
											role: "alert",
											className: JevPage_module_css_default.notice,
											children: t(ratio ? "selectionProbabilityInvalid" : "selectionCountInvalid")
										})
									]
								}, key))
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: JevPage_module_css_default.actions,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "primary",
									disabled: !snapshot.writable || saving || !dirty,
									onClick: () => {
										save();
									},
									children: saving ? t("saving") : t("saveSelectionCounts")
								}), !snapshot.writable && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: JevPage_module_css_default.hint,
									children: t("readOnly")
								})]
							}),
							saveError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								role: "alert",
								className: JevPage_module_css_default.notice,
								children: t("selectionCountSaveFailed")
							})
						]
					})
				]
			});
		}
		const SUPERVISION_FIELDS = [
			{
				key: "driftInterval",
				label: "driftInterval"
			},
			{
				key: "noProgressRounds",
				label: "noProgressRounds"
			},
			{
				key: "maxSupplementRounds",
				label: "maxSupplementRounds"
			},
			{
				key: "evidenceChars",
				label: "evidenceChars"
			}
		];
		function SupervisionSettings({ form, notifySuccess, t }) {
			const subscribe = (0, react.useCallback)((listener) => form.subscribe(listener), [form]);
			const getSnapshot = (0, react.useCallback)(() => form.getSnapshot(), [form]);
			const snapshot = (0, react.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
			const [draft, setDraft] = (0, react.useState)({
				driftInterval: "",
				noProgressRounds: "",
				maxSupplementRounds: "",
				evidenceChars: ""
			});
			const [errors, setErrors] = (0, react.useState)({});
			const [saveError, setSaveError] = (0, react.useState)(false);
			const [saving, setSaving] = (0, react.useState)(false);
			const [hydrated, setHydrated] = (0, react.useState)(false);
			const edited = (0, react.useRef)(false);
			const observed = (0, react.useRef)("");
			(0, react.useEffect)(() => {
				if (snapshot.value === void 0) return;
				const next = {
					driftInterval: String(snapshot.value.driftInterval),
					noProgressRounds: String(snapshot.value.noProgressRounds),
					maxSupplementRounds: String(snapshot.value.maxSupplementRounds),
					evidenceChars: String(snapshot.value.evidenceChars)
				};
				const signature = JSON.stringify(next);
				if (signature === observed.current) return;
				observed.current = signature;
				if (!edited.current) setDraft(next);
				setHydrated(true);
			}, [snapshot.value]);
			const current = snapshot.value;
			const dirty = hydrated && current !== void 0 && SUPERVISION_FIELDS.some(({ key }) => draft[key] !== String(current[key]));
			(0, react.useEffect)(() => {
				if (!dirty) edited.current = false;
			}, [dirty]);
			const edit = (key, value) => {
				edited.current = true;
				setDraft((previous) => ({
					...previous,
					[key]: value
				}));
				setErrors((previous) => ({
					...previous,
					[key]: false
				}));
				setSaveError(false);
			};
			const save = async () => {
				const parsed = {};
				const nextErrors = {};
				for (const { key } of SUPERVISION_FIELDS) {
					const value = parsePositiveInteger(draft[key]);
					if (value === null) nextErrors[key] = true;
					else parsed[key] = value;
				}
				if (Object.keys(nextErrors).length > 0) {
					setErrors(nextErrors);
					return;
				}
				setSaving(true);
				setSaveError(false);
				try {
					if (await form.mutate(SUPERVISION_FIELDS.map(({ key }) => ({
						op: "set",
						path: [key],
						value: parsed[key]
					})), snapshot.revision)) {
						const saved = form.getSnapshot().value;
						if (saved !== void 0) {
							setDraft({
								driftInterval: String(saved.driftInterval),
								noProgressRounds: String(saved.noProgressRounds),
								maxSupplementRounds: String(saved.maxSupplementRounds),
								evidenceChars: String(saved.evidenceChars)
							});
							edited.current = false;
						}
						notifySuccess(t("supervisionCountSaved"));
					} else setSaveError(true);
				} catch {
					setSaveError(true);
				} finally {
					setSaving(false);
				}
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: JevPage_module_css_default.section,
				"aria-label": t("supervisionCounts"),
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
						className: JevPage_module_css_default.heading,
						children: t("supervisionCounts")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: JevPage_module_css_default.hint,
						children: t("supervisionCountsHint")
					}),
					snapshot.status === "loading" && current === void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Loading, { label: t("loading") }),
					snapshot.status === "unavailable" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: JevPage_module_css_default.notice,
						children: t("unavailable")
					}),
					current !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: JevPage_module_css_default.form,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: JevPage_module_css_default.filters,
								children: SUPERVISION_FIELDS.map(({ key, label }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: JevPage_module_css_default.field,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
											htmlFor: `jev-supervision-${key}`,
											children: t(label)
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											id: `jev-supervision-${key}`,
											type: "text",
											inputMode: "numeric",
											value: draft[key],
											"aria-invalid": errors[key] || void 0,
											"aria-describedby": errors[key] ? `jev-supervision-${key}-error` : void 0,
											disabled: !snapshot.writable || saving,
											onChange: (event) => {
												edit(key, event.target.value);
											}
										}),
										errors[key] && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											id: `jev-supervision-${key}-error`,
											role: "alert",
											className: JevPage_module_css_default.notice,
											children: t("supervisionCountInvalid")
										})
									]
								}, key))
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: JevPage_module_css_default.actions,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "primary",
									disabled: !snapshot.writable || saving || !dirty,
									onClick: () => {
										save();
									},
									children: saving ? t("saving") : t("saveSupervisionCounts")
								}), !snapshot.writable && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: JevPage_module_css_default.hint,
									children: t("readOnly")
								})]
							}),
							saveError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								role: "alert",
								className: JevPage_module_css_default.notice,
								children: t("supervisionCountSaveFailed")
							})
						]
					})
				]
			});
		}
		function connectionDraft(value) {
			return {
				baseUrl: value.baseUrl,
				model: value.model,
				credentialRef: value.credentialRef,
				timeoutMs: String(value.timeoutMs),
				judgmentModel: value.judgmentModel ?? "jev",
				lunaApi: value.lunaApi ?? "openrouter",
				lunaOpenRouterBaseUrl: value.lunaOpenRouterBaseUrl ?? "https://openrouter.ai/api/alpha/decisions",
				lunaOpenRouterCredentialRef: value.lunaOpenRouterCredentialRef ?? "JEV_LUNA_OPENROUTER_API_KEY",
				lunaOpenAIBaseUrl: value.lunaOpenAIBaseUrl ?? "https://api.openai.com/v1/decisions",
				lunaOpenAICredentialRef: value.lunaOpenAICredentialRef ?? "JEV_LUNA_OPENAI_API_KEY"
			};
		}
		const EMPTY_DRAFT = connectionDraft({
			baseUrl: "",
			model: "jev-latest",
			credentialRef: "JEV_API_KEY",
			timeoutMs: 1e4,
			features: {},
			judgmentModel: "jev",
			lunaApi: "openrouter",
			lunaOpenRouterBaseUrl: "https://openrouter.ai/api/alpha/decisions",
			lunaOpenRouterCredentialRef: "JEV_LUNA_OPENROUTER_API_KEY",
			lunaOpenAIBaseUrl: "https://api.openai.com/v1/decisions",
			lunaOpenAICredentialRef: "JEV_LUNA_OPENAI_API_KEY"
		});
		function identityKey(connection) {
			return JSON.stringify([
				connection.connectionId,
				connection.baseUrl,
				connection.model,
				connection.credentialRef,
				connection.timeoutMs
			]);
		}
		function SettingsPanel({ form, jev, notifySuccess, t }) {
			const subscribe = (0, react.useCallback)((listener) => form.subscribe(listener), [form]);
			const getSnapshot = (0, react.useCallback)(() => form.getSnapshot(), [form]);
			const snapshot = (0, react.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
			const [draft, setDraft] = (0, react.useState)(EMPTY_DRAFT);
			const editedConnection = (0, react.useRef)(/* @__PURE__ */ new Set());
			const observedConnection = (0, react.useRef)("");
			const draftRef = (0, react.useRef)(draft);
			draftRef.current = draft;
			const [features, setFeatures] = (0, react.useState)([]);
			const [featureLoading, setFeatureLoading] = (0, react.useState)(true);
			const [featureError, setFeatureError] = (0, react.useState)("");
			const [featureErrorLabel, setFeatureErrorLabel] = (0, react.useState)("featureLoadFailed");
			const [saving, setSaving] = (0, react.useState)(false);
			const [saveMessage, setSaveMessage] = (0, react.useState)("");
			const [featureBusy, setFeatureBusy] = (0, react.useState)("");
			const [credential, setCredential] = (0, react.useState)(null);
			const [credentialMessage, setCredentialMessage] = (0, react.useState)("");
			const [secret, setSecret] = (0, react.useState)("");
			const [secretSaving, setSecretSaving] = (0, react.useState)(false);
			const [probe, setProbe] = (0, react.useState)(null);
			const [probeError, setProbeError] = (0, react.useState)("");
			const [testing, setTesting] = (0, react.useState)(false);
			const probeAbort = (0, react.useRef)(null);
			const alive = (0, react.useRef)(true);
			const saveGeneration = (0, react.useRef)(0);
			const credentialGeneration = (0, react.useRef)(0);
			const keyGeneration = (0, react.useRef)(0);
			const probeGeneration = (0, react.useRef)(0);
			(0, react.useEffect)(() => {
				alive.current = true;
				return () => {
					alive.current = false;
					saveGeneration.current++;
					credentialGeneration.current++;
					keyGeneration.current++;
					probeGeneration.current++;
					probeAbort.current?.abort();
				};
			}, [form, jev]);
			(0, react.useEffect)(() => {
				if (snapshot.value === void 0) return;
				const next = connectionDraft(snapshot.value);
				const signature = JSON.stringify(next);
				if (signature === observedConnection.current) return;
				observedConnection.current = signature;
				setDraft((previous) => {
					const merged = { ...next };
					for (const field of editedConnection.current) Object.assign(merged, { [field]: previous[field] });
					return merged;
				});
			}, [snapshot.value]);
			const current = snapshot.value;
			const dirty = current !== void 0 && JSON.stringify(draft) !== JSON.stringify(connectionDraft(current));
			(0, react.useEffect)(() => {
				if (!dirty) editedConnection.current.clear();
			}, [dirty]);
			const displayedConnection = resolveConnectionIdentity({
				...draft,
				timeoutMs: Number(draft.timeoutMs),
				features: current?.features ?? {}
			});
			const savedConnection = current === void 0 ? void 0 : resolveConnectionIdentity({
				...current,
				...connectionDraft(current),
				timeoutMs: current.timeoutMs
			});
			const contextKey = JSON.stringify({
				draft,
				savedConnection,
				dirty,
				status: snapshot.status
			});
			const contextRef = (0, react.useRef)(contextKey);
			contextRef.current = contextKey;
			const loadFeatures = (0, react.useCallback)(async () => {
				setFeatureLoading(true);
				setFeatureError("");
				try {
					const next = await jev.listFeatures();
					if (alive.current) setFeatures(next);
				} catch {
					if (alive.current) {
						setFeatureErrorLabel("featureLoadFailed");
						setFeatureError(t("featureLoadFailed"));
					}
				} finally {
					if (alive.current) setFeatureLoading(false);
				}
			}, [jev, t]);
			(0, react.useEffect)(() => {
				loadFeatures();
			}, [loadFeatures]);
			(0, react.useEffect)(() => {
				const generation = ++credentialGeneration.current;
				keyGeneration.current++;
				probeGeneration.current++;
				probeAbort.current?.abort();
				probeAbort.current = null;
				setCredential(null);
				setCredentialMessage("");
				setSecret("");
				setSecretSaving(false);
				setProbe(null);
				setProbeError("");
				setTesting(false);
				if (dirty || savedConnection === void 0 || snapshot.status !== "ready") return;
				const connection = savedConnection;
				jev.getCredentialStatus(connection).then((result) => {
					if (!alive.current || generation !== credentialGeneration.current || contextRef.current !== contextKey) return;
					if (identityKey(result.connection) !== identityKey(connection)) {
						setCredentialMessage(t("connectionChanged"));
						return;
					}
					setCredential(result);
				}, () => {
					if (alive.current && generation === credentialGeneration.current && contextRef.current === contextKey) setCredentialMessage(t("unavailable"));
				});
			}, [
				contextKey,
				form,
				jev,
				t
			]);
			const editConnection = (field, value) => {
				editedConnection.current.add(field);
				setSaveMessage("");
				setDraft((previous) => ({
					...previous,
					[field]: value
				}));
			};
			const saveConnection = async () => {
				const submission = {
					...draft,
					baseUrl: draft.baseUrl.trim(),
					model: draft.model.trim(),
					credentialRef: draft.credentialRef.trim(),
					lunaOpenRouterBaseUrl: draft.lunaOpenRouterBaseUrl.trim(),
					lunaOpenRouterCredentialRef: draft.lunaOpenRouterCredentialRef.trim(),
					lunaOpenAIBaseUrl: draft.lunaOpenAIBaseUrl.trim(),
					lunaOpenAICredentialRef: draft.lunaOpenAICredentialRef.trim()
				};
				const timeoutMs = Number(draft.timeoutMs);
				if (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 3e5) {
					setSaveMessage(t("invalidTimeout"));
					return;
				}
				const generation = ++saveGeneration.current;
				const submittedDraft = JSON.stringify(draft);
				setSaving(true);
				setSaveMessage("");
				try {
					const values = {
						...submission,
						timeoutMs
					};
					const accepted = await form.mutate(Object.entries(values).map(([key, value]) => ({
						op: "set",
						path: [key],
						value
					})), snapshot.revision);
					if (!alive.current || generation !== saveGeneration.current || JSON.stringify(draftRef.current) !== submittedDraft) return;
					if (!accepted) {
						setSaveMessage(t("saveFailed"));
						return;
					}
					const saved = form.getSnapshot().value;
					if (saved === void 0 || JSON.stringify(connectionDraft(saved)) !== JSON.stringify({
						...submission,
						timeoutMs: String(timeoutMs)
					})) {
						setSaveMessage(t("connectionChanged"));
						return;
					}
					editedConnection.current.clear();
					setDraft(connectionDraft(saved));
					notifySuccess(t("saveSuccess"));
				} catch {
					if (alive.current && generation === saveGeneration.current) setSaveMessage(t("saveFailed"));
				} finally {
					if (alive.current && generation === saveGeneration.current) setSaving(false);
				}
			};
			const saveKey = async () => {
				if (!secret || dirty || savedConnection === void 0 || !credential?.writable) return;
				const connection = savedConnection;
				const capturedContext = contextKey;
				const generation = ++keyGeneration.current;
				setSecretSaving(true);
				setCredentialMessage("");
				try {
					const result = await jev.setCredential(connection, secret);
					if (!alive.current || generation !== keyGeneration.current || contextRef.current !== capturedContext) return;
					if (identityKey(result.connection) !== identityKey(connection)) {
						setCredentialMessage(t("connectionChanged"));
						return;
					}
					credentialGeneration.current++;
					setCredential(result);
					setSecret("");
					notifySuccess(t("keySaved"));
				} catch {
					if (alive.current && generation === keyGeneration.current && contextRef.current === capturedContext) setCredentialMessage(t("keySaveFailed"));
				} finally {
					if (alive.current && generation === keyGeneration.current && contextRef.current === capturedContext) setSecretSaving(false);
				}
			};
			const runProbe = async () => {
				if (dirty || savedConnection === void 0 || snapshot.status !== "ready") return;
				const connection = savedConnection;
				const capturedContext = contextKey;
				const generation = ++probeGeneration.current;
				const controller = new AbortController();
				probeAbort.current = controller;
				setTesting(true);
				setProbe(null);
				setProbeError("");
				try {
					const result = await jev.testConnection(connection, controller.signal);
					if (!alive.current || generation !== probeGeneration.current || contextRef.current !== capturedContext || controller.signal.aborted) return;
					if (identityKey(result.connection) !== identityKey(connection)) {
						setProbeError(t("connectionChanged"));
						return;
					}
					setProbe(result);
				} catch {
					if (alive.current && generation === probeGeneration.current && contextRef.current === capturedContext && !controller.signal.aborted) setProbeError(t("testFailed"));
				} finally {
					if (probeAbort.current === controller) probeAbort.current = null;
					if (alive.current && generation === probeGeneration.current && contextRef.current === capturedContext) setTesting(false);
				}
			};
			const toggleFeature = async (id, enabled) => {
				setFeatureBusy(id);
				setFeatureError("");
				try {
					if (!await form.mutate([{
						op: "set",
						path: ["features", id],
						value: enabled
					}], snapshot.revision) && alive.current) {
						setFeatureErrorLabel("featureSaveFailed");
						setFeatureError(t("featureSaveFailed"));
					}
				} catch {
					if (alive.current) {
						setFeatureErrorLabel("featureSaveFailed");
						setFeatureError(t("featureSaveFailed"));
					}
				} finally {
					if (alive.current) setFeatureBusy("");
				}
			};
			const endpointField = draft.judgmentModel === "jev" ? "baseUrl" : draft.lunaApi === "openrouter" ? "lunaOpenRouterBaseUrl" : "lunaOpenAIBaseUrl";
			const referenceField = draft.judgmentModel === "jev" ? "credentialRef" : draft.lunaApi === "openrouter" ? "lunaOpenRouterCredentialRef" : "lunaOpenAICredentialRef";
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: JevPage_module_css_default.panel,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
					className: JevPage_module_css_default.section,
					"aria-label": t("connection"),
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
							className: JevPage_module_css_default.heading,
							children: t("connection")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: JevPage_module_css_default.hint,
							children: t("connectionHint")
						}),
						snapshot.status === "loading" && current === void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Loading, { label: t("loading") }),
						snapshot.status === "unavailable" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: JevPage_module_css_default.notice,
							children: t("unavailable")
						}),
						current !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: JevPage_module_css_default.form,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: JevPage_module_css_default.filters,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: JevPage_module_css_default.field,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("decisionModel") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
											value: draft.judgmentModel,
											disabled: !snapshot.writable || saving,
											onChange: (event) => {
												editConnection("judgmentModel", event.target.value);
											},
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
												value: "jev",
												children: t("jevModel")
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
												value: "luna",
												children: t("lunaModel")
											})]
										})]
									}), draft.judgmentModel === "luna" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: JevPage_module_css_default.field,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("lunaApi") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
											value: draft.lunaApi,
											disabled: !snapshot.writable || saving,
											onChange: (event) => {
												editConnection("lunaApi", event.target.value);
											},
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
												value: "openrouter",
												children: t("openRouter")
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
												value: "openai",
												children: t("openAI")
											})]
										})]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: JevPage_module_css_default.filters,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
											className: JevPage_module_css_default.field,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("baseUrl") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												value: draft[endpointField],
												disabled: !snapshot.writable || saving,
												onChange: (event) => {
													editConnection(endpointField, event.target.value);
												}
											})]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
											className: JevPage_module_css_default.field,
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("model") }),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
													"aria-label": t("model"),
													"aria-describedby": draft.judgmentModel === "luna" ? "jev-luna-model-hint" : void 0,
													value: draft.judgmentModel === "jev" ? draft.model : displayedConnection.model,
													readOnly: draft.judgmentModel === "luna",
													disabled: !snapshot.writable || saving,
													onChange: (event) => {
														if (draft.judgmentModel === "jev") editConnection("model", event.target.value);
													}
												}),
												draft.judgmentModel === "luna" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													id: "jev-luna-model-hint",
													className: JevPage_module_css_default.hint,
													children: t("lunaModelHint")
												})
											]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
											className: JevPage_module_css_default.field,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("credentialRef") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												value: draft[referenceField],
												disabled: !snapshot.writable || saving,
												onChange: (event) => {
													editConnection(referenceField, event.target.value);
												}
											})]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
											className: JevPage_module_css_default.field,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("timeoutMs") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												type: "number",
												min: "1",
												max: "300000",
												step: "1",
												value: draft.timeoutMs,
												disabled: !snapshot.writable || saving,
												onChange: (event) => {
													editConnection("timeoutMs", event.target.value);
												}
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: JevPage_module_css_default.actions,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
										variant: "primary",
										disabled: !snapshot.writable || saving || !dirty,
										onClick: () => {
											saveConnection();
										},
										children: saving ? t("saving") : t("saveConnection")
									}), !snapshot.writable && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: JevPage_module_css_default.hint,
										children: t("readOnly")
									})]
								}),
								saveMessage && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									role: "status",
									className: JevPage_module_css_default.notice,
									children: saveMessage
								})
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: JevPage_module_css_default.form,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
									className: JevPage_module_css_default.field,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [t("apiKey"), credential !== null ? ` · ${credential.configured ? t("configured") : t("missing")}${!credential.writable ? ` · ${t("readOnly")}` : ""}` : ""] }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											"aria-label": t("apiKey"),
											"aria-describedby": "jev-api-key-hint",
											type: "password",
											autoComplete: "new-password",
											value: secret,
											disabled: !credential?.writable || secretSaving || dirty,
											onChange: (event) => {
												setSecret(event.target.value);
											}
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											id: "jev-api-key-hint",
											className: JevPage_module_css_default.hint,
											children: t("apiKeyHint")
										})
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: JevPage_module_css_default.actions,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
										disabled: !secret || !credential?.writable || secretSaving || dirty,
										onClick: () => {
											saveKey();
										},
										children: secretSaving ? t("saving") : credential?.configured ? t("replaceKey") : t("saveKey")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
										disabled: testing || dirty || snapshot.status !== "ready",
										onClick: () => {
											runProbe();
										},
										children: testing ? t("testing") : t("testConnection")
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: JevPage_module_css_default.hint,
									children: t("diagnosticHint")
								}),
								dirty && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: JevPage_module_css_default.hint,
									children: t("saveFirst")
								}),
								credentialMessage && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									role: "status",
									className: JevPage_module_css_default.notice,
									children: credentialMessage
								}),
								probe && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
									role: "status",
									className: probe.ok ? JevPage_module_css_default.success : JevPage_module_css_default.notice,
									children: [
										t(probe.ok ? "testSucceeded" : "testFailed"),
										" · ",
										t("latency"),
										": ",
										probe.latencyMs,
										" ms",
										probe.failure ? ` · ${probe.failure.code}: ${probe.failure.message}` : ""
									]
								}),
								probeError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									role: "alert",
									className: JevPage_module_css_default.notice,
									children: probeError
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
					className: JevPage_module_css_default.section,
					"aria-label": t("features"),
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: JevPage_module_css_default.recordHead,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
								className: JevPage_module_css_default.heading,
								children: t("features")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								size: "sm",
								disabled: featureLoading,
								onClick: () => {
									loadFeatures();
								},
								children: t("refreshFeatures")
							})]
						}),
						featureLoading && features.length === 0 && current !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Loading, { label: t("loading") }),
						featureError && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
							role: "alert",
							className: JevPage_module_css_default.notice,
							children: [
								featureError,
								" ",
								featureErrorLabel === "featureLoadFailed" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									size: "sm",
									onClick: () => {
										loadFeatures();
									},
									children: t("retry")
								})
							]
						}),
						!featureLoading && !featureError && features.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: JevPage_module_css_default.empty,
							children: t("noFeatures")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: JevPage_module_css_default.list,
							children: features.map((feature) => {
								const enabled = current?.features?.[feature.id] ?? feature.enabled;
								return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: JevPage_module_css_default.feature,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: JevPage_module_css_default.featureBody,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: JevPage_module_css_default.featureTitle,
												children: featureName(feature, t)
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: JevPage_module_css_default.description,
												children: featureDescription(feature, t)
											}),
											feature.settingsDescription && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: JevPage_module_css_default.hint,
												children: feature.settingsDescription
											})
										]
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Switch, {
										checked: enabled,
										label: `${enabled ? t("disable") : t("enable")} ${featureName(feature, t)}`,
										disabled: !snapshot.writable || featureBusy !== "",
										onChange: (next) => {
											toggleFeature(feature.id, next);
										}
									})]
								}, feature.id);
							})
						})
					]
				})]
			});
		}
		function RecordsPanel({ jev, t }) {
			const [features, setFeatures] = (0, react.useState)([]);
			const [featureId, setFeatureId] = (0, react.useState)("");
			const [status, setStatus] = (0, react.useState)("");
			const [sessionId, setSessionId] = (0, react.useState)("");
			const [filter, setFilter] = (0, react.useState)({ limit: PAGE_SIZE });
			const [items, setItems] = (0, react.useState)([]);
			const [nextCursor, setNextCursor] = (0, react.useState)();
			const [loading, setLoading] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)("");
			const [selected, setSelected] = (0, react.useState)("");
			const [detail, setDetail] = (0, react.useState)(null);
			const [detailLoading, setDetailLoading] = (0, react.useState)(false);
			const [detailError, setDetailError] = (0, react.useState)("");
			const queryGeneration = (0, react.useRef)(0);
			const detailGeneration = (0, react.useRef)(0);
			const query = (0, react.useCallback)(async (nextFilter, append) => {
				const generation = ++queryGeneration.current;
				setLoading(true);
				setError("");
				try {
					const page = await jev.listRecords(nextFilter);
					if (generation !== queryGeneration.current) return;
					setItems((previous) => append ? [...previous, ...page.items] : page.items);
					setNextCursor(page.nextCursor);
				} catch {
					if (generation === queryGeneration.current) setError(t("recordsFailed"));
				} finally {
					if (generation === queryGeneration.current) setLoading(false);
				}
			}, [jev, t]);
			(0, react.useEffect)(() => {
				query({ limit: PAGE_SIZE }, false);
				jev.listFeatures().then(setFeatures, () => {});
				return () => {
					queryGeneration.current++;
					detailGeneration.current++;
				};
			}, [jev, query]);
			const applyFilters = () => {
				detailGeneration.current++;
				const next = { limit: PAGE_SIZE };
				if (featureId) next.featureId = featureId;
				if (status) next.status = status;
				if (sessionId.trim()) next.sessionId = sessionId.trim();
				setFilter(next);
				setSelected("");
				setDetail(null);
				query(next, false);
			};
			const openDetail = async (id) => {
				const generation = ++detailGeneration.current;
				setSelected(id);
				setDetailLoading(true);
				setDetailError("");
				if (detail?.id !== id) setDetail(null);
				try {
					const result = await jev.getRecord(id);
					if (generation === detailGeneration.current) setDetail(result);
				} catch {
					if (generation === detailGeneration.current) setDetailError(t("detailFailed"));
				} finally {
					if (generation === detailGeneration.current) setDetailLoading(false);
				}
			};
			const closeDetail = () => {
				detailGeneration.current++;
				setSelected("");
				setDetail(null);
				setDetailError("");
				setDetailLoading(false);
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: JevPage_module_css_default.panel,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
					className: JevPage_module_css_default.section,
					"aria-label": t("records"),
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: JevPage_module_css_default.filters,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
									className: JevPage_module_css_default.field,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("feature") }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											list: "jev-feature-suggestions",
											placeholder: t("allFeatures"),
											value: featureId,
											onChange: (event) => {
												setFeatureId(event.target.value);
											}
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("datalist", {
											id: "jev-feature-suggestions",
											children: features.map((feature) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
												value: feature.id,
												label: featureName(feature, t)
											}, feature.id))
										})
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
									className: JevPage_module_css_default.field,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("status") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
										value: status,
										onChange: (event) => {
											setStatus(event.target.value);
										},
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
											value: "",
											children: t("allStatuses")
										}), STATUSES.map((value) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
											value,
											children: statusLabel(value, t)
										}, value))]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
									className: JevPage_module_css_default.field,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("sessionId") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										value: sessionId,
										onChange: (event) => {
											setSessionId(event.target.value);
										}
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: JevPage_module_css_default.actions,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "primary",
								onClick: applyFilters,
								disabled: loading,
								children: t("applyFilters")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								onClick: () => {
									query(filter, false);
								},
								disabled: loading,
								children: t("refresh")
							})]
						}),
						error && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
							role: "alert",
							className: JevPage_module_css_default.notice,
							children: [
								error,
								" ",
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									size: "sm",
									onClick: () => {
										query(filter, false);
									},
									children: t("retry")
								})
							]
						}),
						loading && items.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Loading, { label: t("loading") }),
						!loading && !error && items.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: JevPage_module_css_default.empty,
							children: t("noRecords")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: JevPage_module_css_default.list,
							children: items.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("article", {
								className: JevPage_module_css_default.record,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: JevPage_module_css_default.recordHead,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: JevPage_module_css_default.featureTitle,
											children: item.diagnostic ? t("diagnostic") : recordFeatureName(features, item.featureId, t)
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: JevPage_module_css_default.meta,
											children: statusLabel(item.status, t)
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: JevPage_module_css_default.meta,
										children: [
											t("time"),
											": ",
											dateText(item.startedAt),
											" · ",
											t("attempts"),
											": ",
											item.attempts,
											item.sessionId ? ` · ${t("sessionId")}: ${item.sessionId}` : ""
										]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
										size: "sm",
										onClick: () => {
											openDetail(item.id);
										},
										children: t("details")
									}) })
								]
							}, item.id))
						}),
						nextCursor && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: JevPage_module_css_default.actions,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								disabled: loading,
								onClick: () => {
									query({
										...filter,
										cursor: nextCursor
									}, true);
								},
								children: loading ? t("loading") : t("loadMore")
							})
						})
					]
				}), selected && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
					className: JevPage_module_css_default.section,
					"aria-label": t("details"),
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: JevPage_module_css_default.recordHead,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
								className: JevPage_module_css_default.heading,
								children: t("details")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								size: "sm",
								onClick: closeDetail,
								children: t("closeDetails")
							})]
						}),
						detailError && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
							role: "alert",
							className: JevPage_module_css_default.notice,
							children: [
								detailError,
								" ",
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									size: "sm",
									onClick: () => {
										openDetail(selected);
									},
									children: t("retry")
								})
							]
						}),
						detailLoading && !detail && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Loading, { label: t("loading") }),
						!detailLoading && !detailError && !detail && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: JevPage_module_css_default.empty,
							children: t("noDetail")
						}),
						detail && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: JevPage_module_css_default.detail,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: JevPage_module_css_default.meta,
									children: [
										t("operation"),
										": ",
										detail.id,
										" · ",
										t("status"),
										": ",
										statusLabel(detail.status, t)
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailBlock, {
									label: t("operation"),
									value: detail.link
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailBlock, {
									label: t("failure"),
									value: detail.failure
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h4", {
									className: JevPage_module_css_default.heading,
									children: t("attempts")
								}),
								detail.attemptRecords.map((attempt, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: JevPage_module_css_default.record,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: JevPage_module_css_default.meta,
											children: [
												"#",
												index + 1,
												" · ",
												dateText(attempt.startedAt),
												" · ",
												statusLabel(attempt.status, t),
												attempt.latencyMs !== void 0 ? ` · ${t("latency")}: ${attempt.latencyMs} ms` : ""
											]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailBlock, {
											label: t("connectionIdentity"),
											value: attempt.connection
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailBlock, {
											label: t("input"),
											value: attempt.request.state
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailBlock, {
											label: t("questions"),
											value: attempt.request.questions
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailBlock, {
											label: t("rawAnswer"),
											value: attempt.rawResponse
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailBlock, {
											label: t("answer"),
											value: attempt.response
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailBlock, {
											label: t("interpretation"),
											value: attempt.interpretation
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailBlock, {
											label: t("failure"),
											value: attempt.failure
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailBlock, {
											label: t("usage"),
											value: attempt.usage
										}),
										attempt.usageComplete === false && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
											className: JevPage_module_css_default.hint,
											children: t("usageIncomplete")
										}),
										attempt.networkRecords !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: JevPage_module_css_default.detail,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h4", {
												className: JevPage_module_css_default.heading,
												children: t("providerRequests")
											}), attempt.networkRecords.map((packet) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: JevPage_module_css_default.record,
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
														className: JevPage_module_css_default.meta,
														children: [
															packet.id,
															" · ",
															statusLabel(packet.status, t),
															packet.httpStatus !== void 0 ? ` · HTTP ${packet.httpStatus}` : ""
														]
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailBlock, {
														label: t("questionIds"),
														value: packet.questionIds
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailBlock, {
														label: t("requestBody"),
														value: packet.requestBody
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailBlock, {
														label: t("reportedModel"),
														value: packet.returnedModel
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailBlock, {
														label: t("requestId"),
														value: packet.requestId
													}),
													packet.rawResponseText !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
														className: JevPage_module_css_default.detailBlock,
														children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: JevPage_module_css_default.detailLabel,
															children: t("rawAnswer")
														}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
															className: JevPage_module_css_default.code,
															children: packet.rawResponseText
														})]
													}),
													packet.rawResponseText === void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailBlock, {
														label: t("rawAnswer"),
														value: packet.rawResponse
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailBlock, {
														label: t("usage"),
														value: packet.usage
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailBlock, {
														label: t("failure"),
														value: packet.failure
													})
												]
											}, packet.id))]
										})
									]
								}, attempt.id)),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h4", {
									className: JevPage_module_css_default.heading,
									children: t("receipts")
								}),
								detail.receipts.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: JevPage_module_css_default.empty,
									children: t("noDetail")
								}) : detail.receipts.map((receipt) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: JevPage_module_css_default.record,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: JevPage_module_css_default.meta,
										children: [
											dateText(receipt.at),
											" · ",
											actionStatusLabel(receipt.status, t)
										]
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailBlock, {
										label: t("actualAction"),
										value: receipt.reason ?? receipt.id
									})]
								}, receipt.id))
							]
						})
					]
				})]
			});
		}
		//#endregion
		//#region src/client/JevToast.tsx
		/** Frame-wide feedback for completed Jev settings writes. */
		/** Render the current message in the Host overlay. */
		function JevToast({ useJevToast, dismiss }) {
			const message = useJevToast((value) => value);
			if (message === null) return null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Toast, {
				text: message.text,
				tone: "success",
				onDone: dismiss
			}, message.sequence);
		}
		//#endregion
		//#region src/client/stage-layout.ts
		/**
		* Merge only adjacent, successful labels within one recorded turn.
		* @param turn - the turn whose step order is the native sequence order.
		* @returns stable segment identities and one visible gap for each unavailable result.
		*/
		function stageNavigationItems(turn) {
			const items = [];
			let current;
			const flush = () => {
				if (current === void 0) return;
				const first = current.steps[0];
				const last = current.steps[current.steps.length - 1];
				const segment = {
					id: `${turn.id}:${first.id}`,
					label: current.label,
					firstStepId: first.id,
					lastStepId: last.id,
					steps: current.steps
				};
				items.push({
					kind: "segment",
					id: segment.id,
					segment
				});
				current = void 0;
			};
			for (const step of [...turn.steps].sort((a, b) => a.startSeq - b.startSeq)) {
				const label = step.status !== "in-progress" && step.analysis.status === "succeeded" ? step.analysis.label : void 0;
				if (label === void 0) {
					flush();
					items.push({
						kind: "gap",
						id: `${turn.id}:${step.id}`,
						step
					});
					continue;
				}
				const previous = current?.steps[current.steps.length - 1];
				if (current?.label !== label || previous?.step !== step.step - 1) {
					flush();
					current = {
						label,
						steps: []
					};
				}
				current.steps.push(step);
			}
			flush();
			return items;
		}
		//#endregion
//#region jev-css:StageNavigation.module.css
		const tag = "@dsh-jev/plugin/src/client/StageNavigation.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tag) + "]") === null) {
			const element = document.createElement("style");
			element.dataset.plugin = "@dsh-jev/plugin";
			element.dataset.pluginCss = tag;
			element.textContent = ".ERvGua_page{width:100%;height:calc(var(--dsh-conversation-viewport-height,100dvh) - var(--dsh-composer-height,152px));box-sizing:border-box;min-width:0;min-height:0;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);flex-direction:column;font-size:13px;line-height:20px;display:flex;overflow:hidden}.ERvGua_toolbar{border-bottom:1px solid var(--dsw-alias-border-l3);flex-wrap:wrap;align-items:center;gap:8px 14px;padding:12px 20px;display:flex}.ERvGua_toolbar h2,.ERvGua_navigation h3,.ERvGua_reader h3,.ERvGua_reader h4,.ERvGua_toolSection h4{margin:0;font-size:14px;font-weight:500;line-height:22px}.ERvGua_toolbarActions{flex-wrap:wrap;align-items:center;gap:8px;margin-left:auto;display:flex}.ERvGua_scopeHint{color:var(--dsw-alias-label-secondary);flex-basis:100%;margin:0;font-size:12px}.ERvGua_notice,.ERvGua_progress,.ERvGua_error{margin:0;font-size:12px}.ERvGua_notice,.ERvGua_progress{color:var(--dsw-alias-label-secondary)}.ERvGua_error{color:var(--dsw-alias-state-error-primary)}.ERvGua_mobileToggle{display:none}.ERvGua_layout{flex:1;grid-template-columns:minmax(230px,275px) minmax(0,1fr);min-height:0;display:grid;overflow:hidden}.ERvGua_navigation,.ERvGua_reader{overscroll-behavior:contain;scrollbar-gutter:stable;min-height:0;overflow:auto}.ERvGua_navigation{border-right:1px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-2);padding:16px 12px 24px}.ERvGua_navigation h3{padding:0 7px 12px}.ERvGua_turnItem{margin-bottom:10px}.ERvGua_turnButton,.ERvGua_segmentButton,.ERvGua_gapButton{border-radius:var(--dsw-radius-sm);width:100%;color:var(--dsw-alias-label-primary);text-align:left;font:inherit;cursor:pointer;background:0 0;border:1px solid #0000;flex-direction:column;align-items:flex-start;gap:3px;display:flex}.ERvGua_turnButton{padding:8px}.ERvGua_turnButton>span{-webkit-line-clamp:2;overflow-wrap:anywhere;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.ERvGua_turnButton small,.ERvGua_segmentButton small,.ERvGua_gapButton small{color:var(--dsw-alias-label-secondary);font-size:12px}.ERvGua_activeTurn,.ERvGua_activeSegment{background:var(--dsw-alias-bg-layer-1);border-color:var(--dsw-alias-border-l3)}.ERvGua_segments{border-left:1px solid var(--dsw-alias-border-l3);margin-left:13px;padding-left:8px}.ERvGua_segmentButton,.ERvGua_gapButton{margin:3px 0;padding:6px 8px}.ERvGua_segmentButton{border-left:2px solid var(--dsw-alias-state-business-primary)}.ERvGua_gapButton{color:var(--dsw-alias-label-secondary)}.ERvGua_turnButton:hover,.ERvGua_segmentButton:hover,.ERvGua_gapButton:hover{background:var(--dsw-alias-bg-layer-1)}.ERvGua_reader{padding:18px 22px 32px}.ERvGua_readerInner{width:100%;max-width:1120px;margin:0 auto}.ERvGua_readerHeader,.ERvGua_readerHeading,.ERvGua_stepHead,.ERvGua_statusLine{flex-wrap:wrap;align-items:baseline;gap:7px 14px;display:flex}.ERvGua_readerHeader{justify-content:space-between;margin-bottom:14px}.ERvGua_readerHeading{justify-content:space-between;margin:20px 0 10px}.ERvGua_request{border:1px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-md);background:var(--dsw-alias-bg-layer-2);padding:12px 14px}.ERvGua_request h4{margin-bottom:8px}.ERvGua_request details{margin-top:8px}.ERvGua_search{color:var(--dsw-alias-label-secondary);align-items:center;gap:8px;display:flex}.ERvGua_search input{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-bg-layer-2);width:220px;min-width:0;min-height:34px;color:var(--dsw-alias-label-primary);font:inherit;padding:5px 8px}.ERvGua_textButton{color:var(--dsw-alias-state-business-primary);font:inherit;cursor:pointer;background:0 0;border:0;padding:2px 0}.ERvGua_stepCard{border:1px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-md);background:var(--dsw-alias-bg-layer-2);margin:10px 0;padding:13px 14px}.ERvGua_inSegment{border-left:3px solid var(--dsw-alias-state-business-primary)}.ERvGua_focused{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:-2px}.ERvGua_stepHead{margin-bottom:5px}.ERvGua_stepNumber{font-weight:500}.ERvGua_stageLabel{color:var(--dsw-alias-state-business-primary)}.ERvGua_statusLine{margin:6px 0;font-size:12px}.ERvGua_muted{color:var(--dsw-alias-label-secondary)}.ERvGua_blocks{flex-direction:column;gap:6px;margin:12px 0;display:flex}.ERvGua_message{border-top:1px solid var(--dsw-alias-border-l3);padding:8px 0}.ERvGua_block,.ERvGua_tool{min-width:0}.ERvGua_blockLabel{margin:8px 0 5px;font-weight:500;display:block}.ERvGua_sourceText{white-space:pre-wrap;overflow-wrap:anywhere;margin:5px 0;font:12px/18px ui-monospace,SFMono-Regular,monospace}.ERvGua_block>.ERvGua_sourceText,.ERvGua_block>details .ERvGua_sourceText,.ERvGua_toolBody .ERvGua_sourceText,.ERvGua_detailPanel .ERvGua_sourceText{border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-bg-layer-1);padding:9px}.ERvGua_toolSection{border-top:1px solid var(--dsw-alias-border-l3);margin-top:13px;padding-top:11px}.ERvGua_toolSection h4{font-size:13px}.ERvGua_tool{border:1px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-sm);margin-top:7px;padding:7px 9px}.ERvGua_tool summary{flex-wrap:wrap;gap:12px;display:flex}.ERvGua_toolBody{padding-top:8px}.ERvGua_analysisSection{border-top:1px solid var(--dsw-alias-border-l3);margin-top:12px;padding-top:9px}.ERvGua_previousResult{border:1px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-sm);color:var(--dsw-alias-label-secondary);flex-wrap:wrap;gap:4px 12px;margin-top:9px;padding:9px;font-size:12px;display:flex}.ERvGua_detailPanel{padding-top:8px}.ERvGua_empty{color:var(--dsw-alias-label-secondary);text-align:center;padding:30px 15px}.ERvGua_loading{flex:1;justify-content:center;align-items:center;display:flex}.ERvGua_page button:focus-visible,.ERvGua_page input:focus-visible,.ERvGua_page summary:focus-visible{outline:var(--dsw-focus-ring-width)solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px}@media (width<=760px){.ERvGua_toolbar{padding:10px 14px}.ERvGua_mobileToggle{border:1px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-sm);color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);font:inherit;cursor:pointer;padding:5px 8px;display:inline-block}.ERvGua_layout{flex-direction:column;display:flex}.ERvGua_navigation{border-right:0;border-bottom:1px solid var(--dsw-alias-border-l3);flex:none;max-height:34%;padding:12px 12px 18px}.ERvGua_navigationClosed{display:none}.ERvGua_reader{flex:1;padding:14px 14px 22px}.ERvGua_search{width:100%}.ERvGua_search input{flex:1;width:auto}}";
			document.head.appendChild(element);
		}
		var StageNavigation_module_css_default = {
			"activeSegment": "ERvGua_activeSegment",
			"activeTurn": "ERvGua_activeTurn",
			"analysisSection": "ERvGua_analysisSection",
			"block": "ERvGua_block",
			"blockLabel": "ERvGua_blockLabel",
			"blocks": "ERvGua_blocks",
			"detailPanel": "ERvGua_detailPanel",
			"empty": "ERvGua_empty",
			"error": "ERvGua_error",
			"focused": "ERvGua_focused",
			"gapButton": "ERvGua_gapButton",
			"inSegment": "ERvGua_inSegment",
			"layout": "ERvGua_layout",
			"loading": "ERvGua_loading",
			"message": "ERvGua_message",
			"mobileToggle": "ERvGua_mobileToggle",
			"muted": "ERvGua_muted",
			"navigation": "ERvGua_navigation",
			"navigationClosed": "ERvGua_navigationClosed",
			"notice": "ERvGua_notice",
			"page": "ERvGua_page",
			"previousResult": "ERvGua_previousResult",
			"progress": "ERvGua_progress",
			"reader": "ERvGua_reader",
			"readerHeader": "ERvGua_readerHeader",
			"readerHeading": "ERvGua_readerHeading",
			"readerInner": "ERvGua_readerInner",
			"request": "ERvGua_request",
			"scopeHint": "ERvGua_scopeHint",
			"search": "ERvGua_search",
			"segmentButton": "ERvGua_segmentButton",
			"segments": "ERvGua_segments",
			"sourceText": "ERvGua_sourceText",
			"stageLabel": "ERvGua_stageLabel",
			"statusLine": "ERvGua_statusLine",
			"stepCard": "ERvGua_stepCard",
			"stepHead": "ERvGua_stepHead",
			"stepNumber": "ERvGua_stepNumber",
			"textButton": "ERvGua_textButton",
			"tool": "ERvGua_tool",
			"toolBody": "ERvGua_toolBody",
			"toolSection": "ERvGua_toolSection",
			"toolbar": "ERvGua_toolbar",
			"toolbarActions": "ERvGua_toolbarActions",
			"turnButton": "ERvGua_turnButton",
			"turnItem": "ERvGua_turnItem"
		};
		//#endregion
		//#region src/client/StageNavigation.tsx
		/** Session-bound, read-only source viewer with explicit Jev stage analysis actions. */
		const LABEL_KEYS = {
			input_parsing: "stageInputParsing",
			problem_understanding: "stageProblemUnderstanding",
			solution_planning: "stageSolutionPlanning",
			implementation: "stageImplementation",
			review_validation: "stageReviewValidation",
			delivery_finalization: "stageDeliveryFinalization",
			mixed: "stageMixed",
			unknown: "stageUnknown"
		};
		const CONNECTION_KEYS = {
			jev: "connectionJev",
			"luna-openrouter": "connectionLunaOpenRouter",
			"luna-openai": "connectionLunaOpenAI"
		};
		function format(value) {
			if (typeof value === "string") return value;
			return JSON.stringify(value, null, 2) ?? "";
		}
		function requestText(requests) {
			return requests.flatMap((message) => message.content.map((block) => block.type === "text" ? block.text : `[${block.type}]`)).join("\n");
		}
		function stepSource(step) {
			return JSON.stringify({
				messages: step.messages,
				tools: step.tools,
				attemptSeqs: step.attemptSeqs
			});
		}
		function analysisLabel(step, t) {
			const analysis = step.analysis;
			if (step.status === "in-progress") return t("running");
			if (analysis.status === "succeeded" && analysis.label !== void 0) return t(LABEL_KEYS[analysis.label]);
			return t(analysis.status);
		}
		function turnStatus(turn, t) {
			if (turn.endSeq === void 0) return t("running");
			switch (turn.reason?.kind) {
				case "aborted": return turn.reason.reason.kind === "user" ? t("aborted") : t("cancelled");
				case "error": return t("endedWithError");
				case "blocked": return t("blocked");
				case "max-tokens": return t("maxTokens");
				case "interrupted": return t("interrupted");
				case "forked": return t("forked");
				default: return t("completed");
			}
		}
		function stageStepRange(segment) {
			const first = segment.steps[0];
			const last = segment.steps[segment.steps.length - 1];
			return first.step === last.step ? String(first.step) : `${first.step}–${last.step}`;
		}
		function Content({ blocks, t }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: StageNavigation_module_css_default.blocks,
				children: blocks.map((block, index) => {
					if (block.type === "reasoning") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
						className: StageNavigation_module_css_default.block,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("summary", { children: [
							t("reasoning"),
							" · ",
							index + 1
						] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
							className: StageNavigation_module_css_default.sourceText,
							children: block.text
						})]
					}, index);
					if (block.type === "text") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: StageNavigation_module_css_default.block,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: StageNavigation_module_css_default.blockLabel,
							children: [
								t("assistantText"),
								" · ",
								index + 1
							]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
							className: StageNavigation_module_css_default.sourceText,
							children: block.text
						})]
					}, index);
					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
						className: StageNavigation_module_css_default.block,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("summary", { children: [
							block.type === "tool-call" ? block.name : t("assistantOther"),
							" · ",
							index + 1
						] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
							className: StageNavigation_module_css_default.sourceText,
							children: format(block)
						})]
					}, index);
				})
			});
		}
		function Tool({ tool, t }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
				className: StageNavigation_module_css_default.tool,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("summary", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: tool.name }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: StageNavigation_module_css_default.muted,
					children: !tool.dispatched ? t("notDispatched") : tool.result === void 0 ? t("missingResult") : tool.result.isError ? t("toolError") : t("toolResult")
				})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: StageNavigation_module_css_default.toolBody,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: StageNavigation_module_css_default.muted,
							children: [
								tool.callId,
								" · seq ",
								tool.seq,
								tool.result && ` → ${tool.result.seq}`
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: StageNavigation_module_css_default.blockLabel,
							children: t("toolArguments")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
							className: StageNavigation_module_css_default.sourceText,
							children: tool.arguments
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: StageNavigation_module_css_default.blockLabel,
							children: t("toolResult")
						}),
						tool.result === void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: StageNavigation_module_css_default.muted,
							children: t("missingResult")
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [tool.result.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
							className: StageNavigation_module_css_default.sourceText,
							children: format(tool.result.error)
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
							className: StageNavigation_module_css_default.sourceText,
							children: format(tool.result.content)
						})] })
					]
				})]
			});
		}
		function StepCard({ step, selected, inSegment, t, onDetails, detailsOpen, previousDetailsOpen, detail, detailLoading, detailFailed }) {
			const analysis = step.analysis;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("article", {
				"data-step-id": step.id,
				className: [
					StageNavigation_module_css_default.stepCard,
					selected ? StageNavigation_module_css_default.focused : "",
					inSegment ? StageNavigation_module_css_default.inSegment : ""
				].join(" "),
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
						className: StageNavigation_module_css_default.stepHead,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: StageNavigation_module_css_default.stepNumber,
								children: [
									t("step"),
									" ",
									step.step
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: StageNavigation_module_css_default.stageLabel,
								children: analysisLabel(step, t)
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: StageNavigation_module_css_default.muted,
								children: [
									"seq ",
									step.startSeq,
									step.endSeq !== void 0 && `–${step.endSeq}`
								]
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: StageNavigation_module_css_default.statusLine,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
								t("analysisStatus"),
								": ",
								t(analysis.status)
							] }),
							analysis.connectionId !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
								t("connection"),
								": ",
								t(CONNECTION_KEYS[analysis.connectionId])
							] }),
							analysis.configuredModel && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
								t("configuredModel"),
								": ",
								analysis.configuredModel
							] }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
								t("model"),
								": ",
								analysis.model ?? t("notProvided")
							] }),
							analysis.status === "succeeded" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
								t("confidence"),
								": ",
								analysis.confidence ?? t("notProvided"),
								" · ",
								t("uncalibrated")
							] }),
							analysis.failure && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: StageNavigation_module_css_default.error,
								children: analysis.failure.code
							}),
							step.assistant?.interrupted && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: StageNavigation_module_css_default.error,
								children: t("aborted")
							}),
							step.tools.some((tool) => tool.result?.isError) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: StageNavigation_module_css_default.error,
								children: t("toolError")
							}),
							step.tools.some((tool) => !tool.dispatched) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: StageNavigation_module_css_default.muted,
								children: t("notDispatched")
							}),
							step.tools.some((tool) => tool.dispatched && tool.result === void 0) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: StageNavigation_module_css_default.muted,
								children: t("missingResult")
							})
						]
					}),
					analysis.status === "stale" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: StageNavigation_module_css_default.muted,
						children: t("staleNotice")
					}),
					analysis.previousResult && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: StageNavigation_module_css_default.previousResult,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
								t("previousSavedResult"),
								": ",
								t(LABEL_KEYS[analysis.previousResult.label])
							] }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
								t("confidence"),
								": ",
								analysis.previousResult.confidence ?? t("notProvided"),
								" · ",
								t("uncalibrated")
							] }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
								t("probabilities"),
								": ",
								analysis.previousResult.probabilities === void 0 ? t("notProvided") : format(analysis.previousResult.probabilities)
							] }),
							analysis.previousResult.configuredModel && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
								t("configuredModel"),
								": ",
								analysis.previousResult.configuredModel
							] }),
							analysis.previousResult.connectionId !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
								t("connection"),
								": ",
								t(CONNECTION_KEYS[analysis.previousResult.connectionId])
							] }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
								t("model"),
								": ",
								analysis.previousResult.model ?? t("notProvided")
							] }),
							analysis.previousResult.stale && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("stale") }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: StageNavigation_module_css_default.textButton,
								type: "button",
								onClick: () => {
									onDetails(analysis.previousResult.recordId);
								},
								"aria-expanded": previousDetailsOpen,
								children: previousDetailsOpen ? t("closeDetails") : t("viewPreviousRecord")
							})
						]
					}),
					step.status === "in-progress" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: StageNavigation_module_css_default.muted,
						children: t("notComplete")
					}),
					step.status === "terminal-partial" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: StageNavigation_module_css_default.muted,
						children: t("terminalPartial")
					}),
					!step.classifiable && step.materialStatus === "NO_MATERIAL" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: StageNavigation_module_css_default.muted,
						children: t("noMaterial")
					}),
					!step.classifiable && step.materialStatus === "MATERIAL_TOO_LARGE" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: StageNavigation_module_css_default.muted,
						children: t("materialTooLarge")
					}),
					step.messages.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: StageNavigation_module_css_default.muted,
						children: t("noText")
					}) : step.messages.map((message) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: StageNavigation_module_css_default.message,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: StageNavigation_module_css_default.muted,
							children: [
								"assistant · seq ",
								message.seq,
								message.interrupted && ` · ${t("aborted")}`
							]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Content, {
							blocks: message.content,
							t
						})]
					}, message.seq)),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: StageNavigation_module_css_default.toolSection,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("h4", { children: [
							t("tools"),
							" · ",
							step.tools.length
						] }), step.tools.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: StageNavigation_module_css_default.muted,
							children: t("noTools")
						}) : step.tools.map((tool) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Tool, {
							tool,
							t
						}, tool.callId))]
					}),
					step.attemptSeqs.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
						className: StageNavigation_module_css_default.block,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("summary", { children: [
							t("attempts"),
							" · ",
							step.attemptSeqs.length
						] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
							className: StageNavigation_module_css_default.sourceText,
							children: step.attemptSeqs.join(", ")
						})]
					}),
					(analysis.status !== "unanalysed" && analysis.status !== "unavailable" || analysis.previousResult !== void 0) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: StageNavigation_module_css_default.analysisSection,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: StageNavigation_module_css_default.statusLine,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("analysis") }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
									t("probabilities"),
									": ",
									analysis.probabilities === void 0 ? t("notProvided") : format(analysis.probabilities)
								] }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									className: StageNavigation_module_css_default.textButton,
									type: "button",
									onClick: () => {
										onDetails();
									},
									"aria-expanded": detailsOpen,
									children: detailsOpen ? t("closeDetails") : t("details")
								})
							]
						}), (detailsOpen || previousDetailsOpen) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: StageNavigation_module_css_default.detailPanel,
							children: [
								detailLoading && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									role: "status",
									children: t("loading")
								}),
								detailFailed && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									role: "alert",
									className: StageNavigation_module_css_default.error,
									children: t("detailFailed")
								}),
								detail && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: StageNavigation_module_css_default.muted,
										children: t("redactionNote")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: StageNavigation_module_css_default.muted,
										children: [
											t("sourceStep"),
											": ",
											detail.stepId,
											" · ",
											detail.ruleVersion
										]
									}),
									detail.connection !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: StageNavigation_module_css_default.blockLabel,
										children: t("connection")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
										className: StageNavigation_module_css_default.sourceText,
										children: format(detail.connection)
									})] }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: StageNavigation_module_css_default.blockLabel,
										children: t("requestSent")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
										className: StageNavigation_module_css_default.sourceText,
										children: detail.request === void 0 ? t("notProvided") : format(detail.request)
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: StageNavigation_module_css_default.blockLabel,
										children: t("rawResponse")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
										className: StageNavigation_module_css_default.sourceText,
										children: detail.rawResponse === void 0 ? t("notProvided") : format(detail.rawResponse)
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: StageNavigation_module_css_default.blockLabel,
										children: t("parsedResponse")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
										className: StageNavigation_module_css_default.sourceText,
										children: detail.response === void 0 ? t("notProvided") : format(detail.response)
									}),
									detail.networkRecords !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: StageNavigation_module_css_default.blockLabel,
										children: t("providerRequests")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
										className: StageNavigation_module_css_default.sourceText,
										children: format(detail.networkRecords)
									})] }),
									detail.usageComplete === false && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: StageNavigation_module_css_default.muted,
										children: t("usageIncomplete")
									})
								] })
							]
						})]
					})
				]
			});
		}
		/** Render the Host's full authorized Session history and persisted Jev annotations. */
		function StageNavigation({ sessionId, jev, t, openView }) {
			const [loadedSnapshot, setSnapshot] = (0, react.useState)(null);
			const [loadError, setLoadError] = (0, react.useState)(false);
			const [actionError, setActionError] = (0, react.useState)(null);
			const [busy, setBusy] = (0, react.useState)(false);
			const [selectedTurnId, setSelectedTurnId] = (0, react.useState)(null);
			const [selectedSegmentId, setSelectedSegmentId] = (0, react.useState)(null);
			const [selectedStepId, setSelectedStepId] = (0, react.useState)(null);
			const [focusVersion, setFocusVersion] = (0, react.useState)(0);
			const [query, setQuery] = (0, react.useState)("");
			const [navigationOpen, setNavigationOpen] = (0, react.useState)(true);
			const [detailsTarget, setDetailsTarget] = (0, react.useState)(null);
			const [detail, setDetail] = (0, react.useState)(void 0);
			const [detailLoading, setDetailLoading] = (0, react.useState)(false);
			const [detailFailed, setDetailFailed] = (0, react.useState)(false);
			const reader = (0, react.useRef)(null);
			const activeSession = (0, react.useRef)(sessionId);
			const readSequence = (0, react.useRef)(0);
			const detailSequence = (0, react.useRef)(0);
			const actionSequence = (0, react.useRef)(0);
			activeSession.current = sessionId;
			const snapshot = loadedSnapshot?.sessionId === sessionId ? loadedSnapshot : null;
			const refresh = (0, react.useCallback)(async (signal) => {
				const sequence = ++readSequence.current;
				try {
					const next = await jev.getStageNavigation(sessionId, signal);
					if (signal.aborted || activeSession.current !== sessionId || sequence !== readSequence.current || next.sessionId !== sessionId) return;
					setSnapshot(next);
					setLoadError(false);
				} catch {
					if (!signal.aborted && activeSession.current === sessionId && sequence === readSequence.current) setLoadError(true);
				}
			}, [jev, sessionId]);
			(0, react.useEffect)(() => {
				actionSequence.current++;
				setSnapshot(null);
				setLoadError(false);
				setActionError(null);
				setBusy(false);
				setSelectedTurnId(null);
				setSelectedSegmentId(null);
				setSelectedStepId(null);
				setQuery("");
				setDetailsTarget(null);
				setDetail(void 0);
				setDetailFailed(false);
				detailSequence.current++;
				const controller = new AbortController();
				refresh(controller.signal);
				return () => {
					controller.abort();
				};
			}, [refresh]);
			(0, react.useEffect)(() => {
				if (snapshot?.batch?.status !== "running") return;
				const controller = new AbortController();
				let active = true;
				let timer;
				const poll = async () => {
					await refresh(controller.signal);
					if (active) timer = window.setTimeout(() => {
						poll();
					}, 900);
				};
				timer = window.setTimeout(() => {
					poll();
				}, 900);
				return () => {
					active = false;
					window.clearTimeout(timer);
					controller.abort();
				};
			}, [
				refresh,
				snapshot?.batch?.id,
				snapshot?.batch?.status
			]);
			(0, react.useEffect)(() => {
				if (snapshot?.featureEnabled === false) openView("chat", "");
			}, [openView, snapshot?.featureEnabled]);
			const selectedTurn = snapshot?.turns.find((turn) => turn.id === selectedTurnId) ?? snapshot?.turns[snapshot.turns.length - 1];
			const selectedSegment = (0, react.useMemo)(() => selectedTurn ? stageNavigationItems(selectedTurn) : [], [selectedTurn]).find((item) => item.kind === "segment" && item.id === selectedSegmentId);
			const segmentStepIds = new Set(selectedSegment?.kind === "segment" ? selectedSegment.segment.steps.map((step) => step.id) : []);
			const visibleSteps = selectedTurn?.steps.filter((step) => query.trim() === "" || stepSource(step).toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())) ?? [];
			const completedTurnCount = snapshot?.turns.filter((turn) => turn.endSeq !== void 0).length ?? 0;
			const turnReadySteps = selectedTurn?.endSeq === void 0 ? [] : selectedTurn.steps.filter((step) => step.classifiable);
			const allReadySteps = snapshot?.turns.filter((turn) => turn.endSeq !== void 0).flatMap((turn) => turn.steps).filter((step) => step.classifiable) ?? [];
			const missingTurnCount = turnReadySteps.filter((step) => step.analysis.status === "unanalysed").length;
			const missingAllCount = allReadySteps.filter((step) => step.analysis.status === "unanalysed").length;
			const retryTurnCount = turnReadySteps.filter((step) => step.analysis.status === "failed" || step.analysis.status === "cancelled" || step.analysis.status === "interrupted").length;
			const refreshTurnCount = turnReadySteps.length;
			const featureEnabled = snapshot?.featureEnabled ?? false;
			const batchRunning = snapshot?.batch?.status === "running";
			(0, react.useLayoutEffect)(() => {
				if (selectedStepId === null) return;
				const container = reader.current;
				const step = [...container?.querySelectorAll("[data-step-id]") ?? []].find((node) => node.dataset.stepId === selectedStepId);
				if (container && step) container.scrollTop += step.getBoundingClientRect().top - container.getBoundingClientRect().top - 14;
			}, [
				selectedStepId,
				selectedTurn?.id,
				focusVersion
			]);
			const chooseTurn = (turn) => {
				setSelectedTurnId(turn.id);
				setSelectedSegmentId(null);
				setSelectedStepId(null);
				setQuery("");
				if (reader.current) reader.current.scrollTop = 0;
			};
			const chooseSegment = (turn, segment) => {
				setSelectedTurnId(turn.id);
				setSelectedSegmentId(segment.id);
				setSelectedStepId(segment.firstStepId);
				setFocusVersion((value) => value + 1);
				setQuery("");
			};
			const start = async (scope, mode) => {
				if (busy || batchRunning || !featureEnabled) return;
				const sequence = ++actionSequence.current;
				setBusy(true);
				setActionError(null);
				try {
					const batch = await jev.startStageAnalysis({
						sessionId,
						scope,
						mode
					});
					if (activeSession.current !== sessionId || sequence !== actionSequence.current) return;
					setSnapshot((previous) => previous?.sessionId === sessionId ? {
						...previous,
						batch
					} : previous);
					await refresh(new AbortController().signal);
				} catch {
					if (activeSession.current === sessionId && sequence === actionSequence.current) setActionError("analyzeFailed");
				} finally {
					if (activeSession.current === sessionId && sequence === actionSequence.current) setBusy(false);
				}
			};
			const cancel = async () => {
				const batch = snapshot?.batch;
				if (!batch || batch.status !== "running" || busy) return;
				const sequence = ++actionSequence.current;
				setBusy(true);
				setActionError(null);
				try {
					await jev.cancelStageAnalysis(batch.id);
					if (activeSession.current !== sessionId || sequence !== actionSequence.current) return;
					await refresh(new AbortController().signal);
				} catch {
					if (activeSession.current === sessionId && sequence === actionSequence.current) setActionError("cancelFailed");
				} finally {
					if (activeSession.current === sessionId && sequence === actionSequence.current) setBusy(false);
				}
			};
			const toggleDetails = async (stepId, recordId) => {
				const sequence = ++detailSequence.current;
				if (detailsTarget?.stepId === stepId && detailsTarget.recordId === recordId) {
					setDetailsTarget(null);
					return;
				}
				setDetailsTarget({
					stepId,
					...recordId === void 0 ? {} : { recordId }
				});
				setDetail(void 0);
				setDetailLoading(true);
				setDetailFailed(false);
				try {
					const result = recordId === void 0 ? await jev.getStageAnalysisRecord(sessionId, stepId) : await jev.getStageAnalysisRecord(sessionId, stepId, recordId);
					if (activeSession.current === sessionId && sequence === detailSequence.current) setDetail(result);
				} catch {
					if (activeSession.current === sessionId && sequence === detailSequence.current) setDetailFailed(true);
				} finally {
					if (activeSession.current === sessionId && sequence === detailSequence.current) setDetailLoading(false);
				}
			};
			if (snapshot?.featureEnabled === false) return null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: StageNavigation_module_css_default.page,
				"aria-label": t("title"),
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: StageNavigation_module_css_default.toolbar,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: t("title") }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: StageNavigation_module_css_default.toolbarActions,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: StageNavigation_module_css_default.mobileToggle,
									onClick: () => {
										setNavigationOpen((open) => !open);
									},
									"aria-expanded": navigationOpen,
									children: navigationOpen ? t("hideNavigation") : t("showNavigation")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									size: "sm",
									variant: "outline",
									onClick: () => {
										refresh(new AbortController().signal);
									},
									children: t("refresh")
								}),
								featureEnabled && selectedTurn?.endSeq !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									size: "sm",
									disabled: busy || batchRunning || missingTurnCount === 0,
									onClick: () => {
										start({
											kind: "turn",
											turn: selectedTurn.turn
										}, "missing");
									},
									children: t("analyzeTurn")
								}),
								featureEnabled && completedTurnCount > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									size: "sm",
									variant: "outline",
									disabled: busy || batchRunning || missingAllCount === 0,
									onClick: () => {
										start({ kind: "all" }, "missing");
									},
									children: t("analyzeAll")
								}),
								featureEnabled && selectedTurn?.endSeq !== void 0 && selectedTurn.steps.some((step) => [
									"failed",
									"cancelled",
									"interrupted"
								].includes(step.analysis.status)) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									size: "sm",
									variant: "outline",
									disabled: busy || batchRunning || retryTurnCount === 0,
									onClick: () => {
										start({
											kind: "turn",
											turn: selectedTurn.turn
										}, "retry-failed");
									},
									children: t("retryFailed")
								}),
								featureEnabled && selectedTurn?.endSeq !== void 0 && selectedTurn.steps.some((step) => step.analysis.status === "succeeded" || step.analysis.status === "stale") && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									size: "sm",
									variant: "outline",
									disabled: busy || batchRunning || refreshTurnCount === 0,
									onClick: () => {
										start({
											kind: "turn",
											turn: selectedTurn.turn
										}, "refresh");
									},
									children: t("reanalyzeTurn")
								}),
								batchRunning && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									size: "sm",
									variant: "outline",
									disabled: busy,
									onClick: () => {
										cancel();
									},
									children: t("cancel")
								})
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
							className: StageNavigation_module_css_default.scopeHint,
							children: [
								t("missingTurnCount"),
								": ",
								missingTurnCount,
								" ",
								t("steps"),
								" · ",
								t("missingAllCount"),
								": ",
								missingAllCount,
								" ",
								t("steps"),
								" · ",
								t("retryTurnCount"),
								": ",
								retryTurnCount,
								" ",
								t("steps"),
								" · ",
								t("refreshTurnCount"),
								": ",
								refreshTurnCount,
								" ",
								t("steps"),
								" (",
								t("refreshWarning"),
								") · ",
								t("scopeHint")
							]
						}),
						snapshot?.batch && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
							role: "status",
							className: StageNavigation_module_css_default.progress,
							children: [
								t("batchProgress"),
								": ",
								snapshot.batch.completed + snapshot.batch.failed + snapshot.batch.cancelled,
								" / ",
								snapshot.batch.total,
								" · ",
								t(snapshot.batch.status === "running" ? "analyzing" : snapshot.batch.status),
								snapshot.batch.failure && ` · ${snapshot.batch.failure.code}`
							]
						}),
						actionError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							role: "alert",
							className: StageNavigation_module_css_default.error,
							children: t(actionError)
						}),
						loadError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							role: "alert",
							className: StageNavigation_module_css_default.error,
							children: t("loadFailed")
						})
					]
				}), snapshot === null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: StageNavigation_module_css_default.loading,
					role: "status",
					"aria-label": t("loading"),
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.StateDot, {
						state: "ongoing",
						size: 24
					})
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: StageNavigation_module_css_default.layout,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("nav", {
						className: [StageNavigation_module_css_default.navigation, navigationOpen ? "" : StageNavigation_module_css_default.navigationClosed].join(" "),
						"aria-label": t("navigation"),
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("h3", { children: [
							t("navigation"),
							" · ",
							snapshot.turns.length
						] }), snapshot.turns.map((turn) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: StageNavigation_module_css_default.turnItem,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: [StageNavigation_module_css_default.turnButton, selectedTurn?.id === turn.id ? StageNavigation_module_css_default.activeTurn : ""].join(" "),
								onClick: () => {
									chooseTurn(turn);
								},
								"aria-current": selectedTurn?.id === turn.id ? "true" : void 0,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
									t("turn"),
									" ",
									turn.turn,
									" · ",
									requestText(turn.requests) || t("request")
								] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [
									turn.steps.length,
									" ",
									t("steps"),
									" · ",
									turnStatus(turn, t)
								] })]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: StageNavigation_module_css_default.segments,
								children: stageNavigationItems(turn).map((item) => item.kind === "segment" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: [StageNavigation_module_css_default.segmentButton, selectedSegmentId === item.id ? StageNavigation_module_css_default.activeSegment : ""].join(" "),
									onClick: () => {
										chooseSegment(turn, item.segment);
									},
									"aria-current": selectedSegmentId === item.id ? "true" : void 0,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t(LABEL_KEYS[item.segment.label]) }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [
										t("step"),
										" ",
										stageStepRange(item.segment)
									] })]
								}, item.id) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: StageNavigation_module_css_default.gapButton,
									onClick: () => {
										chooseTurn(turn);
										setSelectedStepId(item.step.id);
										setFocusVersion((value) => value + 1);
									},
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
										t("step"),
										" ",
										item.step.step
									] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: analysisLabel(item.step, t) })]
								}, item.id))
							})]
						}, turn.id))]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: StageNavigation_module_css_default.reader,
						ref: reader,
						children: !selectedTurn ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: StageNavigation_module_css_default.empty,
							children: t("emptySession")
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: StageNavigation_module_css_default.readerInner,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: StageNavigation_module_css_default.readerHeader,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("h3", { children: [
										t("turn"),
										" ",
										selectedTurn.turn,
										" · ",
										turnStatus(selectedTurn, t)
									] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: StageNavigation_module_css_default.muted,
										children: [
											selectedTurn.steps.length,
											" ",
											t("steps"),
											" · seq ",
											selectedTurn.startSeq,
											selectedTurn.endSeq !== void 0 && `–${selectedTurn.endSeq}`
										]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
									className: StageNavigation_module_css_default.request,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h4", { children: t("request") }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
											className: StageNavigation_module_css_default.sourceText,
											children: requestText(selectedTurn.requests) || t("notProvided")
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("summary", { children: t("source") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
											className: StageNavigation_module_css_default.sourceText,
											children: format(selectedTurn.requests)
										})] })
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: StageNavigation_module_css_default.readerHeading,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: t("source") }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
											className: StageNavigation_module_css_default.search,
											children: [t("search"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												value: query,
												onChange: (event) => {
													setQuery(event.target.value);
												},
												placeholder: t("search")
											})]
										}),
										query && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: StageNavigation_module_css_default.textButton,
											onClick: () => {
												setQuery("");
											},
											children: t("clearSearch")
										})
									]
								}),
								selectedTurn.steps.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: StageNavigation_module_css_default.empty,
									children: t("emptyTurn")
								}) : visibleSteps.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: StageNavigation_module_css_default.empty,
									children: t("emptySearch")
								}) : visibleSteps.map((step) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StepCard, {
									step,
									t,
									selected: selectedStepId === step.id,
									inSegment: segmentStepIds.has(step.id),
									onDetails: (recordId) => {
										toggleDetails(step.id, recordId);
									},
									detailsOpen: detailsTarget?.stepId === step.id && detailsTarget.recordId === void 0,
									previousDetailsOpen: detailsTarget?.stepId === step.id && detailsTarget.recordId !== void 0,
									detail: detailsTarget?.stepId === step.id ? detail : void 0,
									detailLoading: detailsTarget?.stepId === step.id && detailLoading,
									detailFailed: detailsTarget?.stepId === step.id && detailFailed
								}, step.id))
							]
						})
					})]
				})]
			});
		}
		//#endregion
		//#region src/client/stage-registration.ts
		/**
		* Register the stage view only while the feature is explicitly enabled.
		* @param form - Host-owned Jev settings snapshot.
		* @param register - contributes the conversation view and returns its disposer.
		* @returns unsubscribes and removes any active view.
		*/
		function watchStageView(form, register) {
			let disposeView;
			const sync = () => {
				const enabled = form.getSnapshot().value?.features["stage-navigation"] === true;
				if (enabled && disposeView === void 0) disposeView = register();
				else if (!enabled && disposeView !== void 0) {
					disposeView();
					disposeView = void 0;
				}
			};
			const unsubscribe = form.subscribe(sync);
			sync();
			return () => {
				unsubscribe();
				disposeView?.();
				disposeView = void 0;
			};
		}
		//#endregion
		//#region src/client/stage-locales.ts
		const stageEn = {
			connection: "Judgment connection",
			connectionJev: "Jev",
			connectionLunaOpenRouter: "Luna Decisions / OpenRouter",
			connectionLunaOpenAI: "Luna Decisions / OpenAI",
			providerRequests: "Actual provider requests and responses",
			usageIncomplete: "Reported usage is incomplete.",
			title: "Stage navigation",
			navigation: "Turns and stages",
			showNavigation: "Show navigation",
			hideNavigation: "Hide navigation",
			refresh: "Refresh",
			loading: "Loading session history…",
			loadFailed: "Could not load session history.",
			emptySession: "No turns are recorded in this session.",
			emptyTurn: "No steps are recorded in this turn.",
			emptySearch: "No source steps match this search.",
			turn: "Turn",
			step: "Step",
			steps: "steps",
			request: "User request",
			source: "Original step records",
			search: "Search this turn’s source",
			clearSearch: "Clear search",
			analyzeTurn: "Analyze this turn",
			analyzeAll: "Analyze unanalysed steps",
			retryFailed: "Retry failed steps",
			reanalyzeTurn: "Reanalyze this turn",
			cancel: "Cancel analysis",
			analyzing: "Analyzing…",
			analyzeFailed: "Could not start analysis.",
			cancelFailed: "Could not cancel analysis.",
			scopeTurn: "Selected completed turn",
			scopeAll: "All completed turns",
			scopeHint: "Only recorded step material is sent to the selected judgment connection. Input is redacted; the original Session is unchanged.",
			pendingCount: "Eligible steps",
			batchProgress: "Analysis progress",
			missingTurnCount: "Missing in this turn",
			missingAllCount: "Missing in this session",
			retryTurnCount: "Retryable in this turn",
			refreshTurnCount: "Reanalysis in this turn",
			refreshWarning: "Reanalysis makes new judgment requests",
			stageInputParsing: "Input parsing",
			stageProblemUnderstanding: "Problem understanding",
			stageSolutionPlanning: "Solution planning",
			stageImplementation: "Implementation and debugging",
			stageReviewValidation: "Review and validation",
			stageDeliveryFinalization: "Delivery and finalization",
			stageMixed: "Mixed",
			stageUnknown: "Unknown",
			unanalysed: "Unanalysed",
			stale: "Outdated",
			failed: "Failed",
			unavailable: "Material unavailable",
			cancelled: "Cancelled",
			pending: "Pending",
			succeeded: "Classified",
			interrupted: "Interrupted",
			running: "Running",
			completed: "Completed",
			aborted: "Aborted",
			endedWithError: "Ended with error",
			unknownEnd: "Ended",
			reasoning: "Think / reasoning",
			assistantText: "Assistant text",
			assistantOther: "Other assistant block",
			tools: "Tool calls and results",
			toolArguments: "Arguments",
			toolResult: "Result",
			toolError: "Tool reported an error",
			missingResult: "No result recorded",
			notDispatched: "Call was not dispatched",
			attempts: "Attempts and retries",
			analysis: "Stage classification",
			analysisStatus: "Classification status",
			confidence: "Confidence",
			probabilities: "Probabilities",
			notProvided: "Not provided",
			model: "Reported model",
			configuredModel: "Configured model",
			details: "Classification input and response",
			closeDetails: "Close details",
			detailFailed: "Could not load the classification record.",
			requestSent: "Redacted judgment input",
			previousSavedResult: "Previous saved result",
			viewPreviousRecord: "View previous record",
			rawResponse: "Raw response",
			parsedResponse: "Normalized answer",
			redactionNote: "Classification input is redacted before it is sent and saved. Source records below remain original.",
			uncalibrated: "Uncalibrated signal",
			sourceStep: "Source step",
			noReasoning: "No reasoning block was recorded.",
			noText: "No assistant text was recorded.",
			noTools: "This step has no tool call.",
			notComplete: "This step is still in progress and cannot be classified.",
			terminalPartial: "The turn ended before this step closed. Recorded material is shown; some results may be missing.",
			staleNotice: "This saved classification is outdated and is excluded from the stage sequence.",
			noMaterial: "No classifiable material was recorded.",
			materialTooLarge: "The complete step exceeds the request limit and was not truncated.",
			blocked: "Blocked",
			maxTokens: "Output limit reached",
			forked: "Fork boundary"
		};
		const stageZh = {
			connection: "判断连接",
			connectionJev: "Jev",
			connectionLunaOpenRouter: "Luna Decisions / OpenRouter",
			connectionLunaOpenAI: "Luna Decisions / OpenAI",
			providerRequests: "实际提供方请求与响应",
			usageIncomplete: "服务报告用量不完整",
			title: "阶段导航",
			navigation: "轮次与阶段",
			showNavigation: "展开导航",
			hideNavigation: "收起导航",
			refresh: "刷新",
			loading: "正在读取会话历史…",
			loadFailed: "无法读取会话历史",
			emptySession: "本会话尚无已记录轮次",
			emptyTurn: "本轮尚无已记录步骤",
			emptySearch: "本轮原文没有匹配的步骤",
			turn: "第",
			step: "步骤",
			steps: "步",
			request: "用户请求",
			source: "完整步骤原文",
			search: "搜索本轮原文",
			clearSearch: "清除搜索",
			analyzeTurn: "分析本轮",
			analyzeAll: "补齐未分析步骤",
			retryFailed: "重试失败步骤",
			reanalyzeTurn: "重新分析本轮",
			cancel: "取消分析",
			analyzing: "分析中…",
			analyzeFailed: "无法启动分析",
			cancelFailed: "无法取消分析",
			scopeTurn: "选中的已结束轮",
			scopeAll: "本会话全部已结束轮",
			scopeHint: "只向所选判断连接发送已记录的步骤材料；输入先脱敏，原始 Session 不变",
			pendingCount: "可处理步骤",
			batchProgress: "分析进度",
			missingTurnCount: "本轮待补齐",
			missingAllCount: "本会话待补齐",
			retryTurnCount: "本轮可重试",
			refreshTurnCount: "本轮可重分析",
			refreshWarning: "重分析将再次发起判断请求",
			stageInputParsing: "输入解析",
			stageProblemUnderstanding: "问题理解澄清",
			stageSolutionPlanning: "方案规划",
			stageImplementation: "实现与调试",
			stageReviewValidation: "审查验证",
			stageDeliveryFinalization: "交付收尾",
			stageMixed: "混合",
			stageUnknown: "未知",
			unanalysed: "未分析",
			stale: "已过期",
			failed: "失败",
			unavailable: "材料不可用",
			cancelled: "已取消",
			pending: "等待中",
			succeeded: "已分类",
			interrupted: "已中断",
			running: "进行中",
			completed: "已结束",
			aborted: "用户中止",
			endedWithError: "错误结束",
			unknownEnd: "已结束",
			reasoning: "完整 Think / reasoning",
			assistantText: "对外文本",
			assistantOther: "其他助手内容",
			tools: "全部工具调用与返回",
			toolArguments: "完整参数",
			toolResult: "完整返回",
			toolError: "工具报告错误",
			missingResult: "未记录返回",
			notDispatched: "工具调用未派发",
			attempts: "尝试与重试",
			analysis: "阶段分类",
			analysisStatus: "分类状态",
			confidence: "Confidence",
			probabilities: "Probabilities",
			notProvided: "未提供",
			model: "返回模型",
			configuredModel: "配置模型",
			details: "分类输入与返回",
			closeDetails: "收起详情",
			detailFailed: "无法读取分类记录",
			requestSent: "脱敏判断输入",
			previousSavedResult: "之前保存的有效结果",
			viewPreviousRecord: "查看旧记录",
			rawResponse: "原始回答",
			parsedResponse: "统一答案",
			redactionNote: "分类输入在发送和保存前已脱敏；下方来源记录保持原文",
			uncalibrated: "未经校准",
			sourceStep: "来源步骤",
			noReasoning: "本步骤未记录 reasoning 内容",
			noText: "本步骤未记录对外文本",
			noTools: "本步骤没有工具调用",
			notComplete: "本步骤仍在进行中，不能分类",
			terminalPartial: "本轮在步骤闭合前结束；这里展示已记录材料，部分返回可能缺失",
			staleNotice: "这条保存的分类已过期，不参与当前阶段合并",
			noMaterial: "没有可分类的已记录材料",
			materialTooLarge: "完整步骤超过请求上限，未截断发送",
			blocked: "已阻塞",
			maxTokens: "达到输出上限",
			forked: "派生会话边界"
		};
		//#endregion
		//#region src/client/locales.ts
		/** English copy. */
		const en = {
			sharedFindingsName: "Shared finding corrections",
			sharedFindingsDescription: "Compare already shared reports and messages, correct actual recipients, and ask the root to verify conflicts.",
			stageNavigationName: "Stage navigation",
			stageNavigationDescription: "Manually classify complete recorded steps in a Session and browse adjacent purpose stages.",
			mcpSelectionName: "MCP auto-selection",
			mcpSelectionDescription: "Select native MCP tool definitions for the current task. PTC and both modes retains the Host’s original tools; no service installation, connection, or permission changes.",
			mcpSelectionSettings: "MCP auto-selection settings",
			mcpSelectionHint: "Filters only native MCP tool definitions. PTC and both modes keeps the Host’s original tools. This does not install or connect services or change permissions. Saving settings does not enable the feature.",
			mcpSelectionBudgetHint: "The automatic budget is not a total tool limit: pinned tools and tools loaded through mcp_load may exceed it. A budget of 0 selects no tools automatically.",
			mcpToolLimit: "Automatic tool budget (0–1,000)",
			mcpMinProbability: "Minimum selection probability (0–1)",
			mcpAllowZero: "Allow zero automatic selections",
			mcpAllowZeroHint: "When off, select at least one available candidate even below the probability threshold. Requires an automatic budget of at least 1.",
			mcpPinnedTools: "Pinned tool names",
			mcpPinnedToolsHint: "One complete tool name per line, with no wildcards. Surrounding whitespace and duplicate names are removed. Leave empty for no pinned tools.",
			mcpWaitMs: "Judgment wait (1–300,000 ms)",
			mcpMaxRequestChars: "Request character limit (2,048–1,000,000)",
			mcpToolLimitInvalid: "Enter a whole number from 0 to 1,000.",
			mcpProbabilityInvalid: "Enter a probability from 0 to 1.",
			mcpWaitInvalid: "Enter a whole number from 1 to 300,000 milliseconds.",
			mcpRequestInvalid: "Enter a whole number from 2,048 to 1,000,000 characters.",
			mcpPinsInvalid: "Use complete tool names without wildcard characters (*, ?, [ or ]).",
			mcpZeroInvalid: "Allow zero selections or increase the automatic tool budget to at least 1.",
			saveMcpSelection: "Save MCP selection settings",
			mcpSelectionSaved: "MCP selection settings saved.",
			mcpSelectionSaveFailed: "Could not save MCP selection settings. Your edits are preserved; review and retry.",
			tabs: "Jev pages",
			settings: "Settings and features",
			records: "Decision records",
			connection: "Shared connection",
			features: "Features",
			noFeatures: "No features are registered yet.",
			baseUrl: "Service address",
			model: "Model",
			credentialRef: "Credential reference",
			timeoutMs: "Timeout (ms)",
			decisionModel: "Judgment model",
			jevModel: "Jev",
			lunaModel: "Luna Decisions",
			lunaApi: "Luna API",
			openRouter: "OpenRouter",
			openAI: "OpenAI",
			lunaModelHint: "This API uses the fixed Luna Decisions model shown above.",
			connectionHint: "All enabled features use the saved judgment connection. The main agent model is configured separately in DSH.",
			diagnosticHint: "Test the saved connection with fixed Choice, Score, and Noul questions. No task content is sent.",
			connectionChanged: "The connection changed. Refresh its saved settings before retrying.",
			providerRequests: "Provider requests",
			requestBody: "Sent request",
			questionIds: "Question IDs",
			reportedModel: "Reported model",
			requestId: "Provider request ID",
			usageIncomplete: "Usage is incomplete; some requests did not report usage.",
			apiKey: "API key",
			apiKeyHint: "Saved in Host credentials. This field never shows the saved key.",
			configured: "Configured",
			missing: "Missing",
			readOnly: "Read-only",
			unavailable: "Settings are unavailable.",
			loading: "Loading…",
			saveConnection: "Save connection",
			saveFirst: "Save the connection before changing its key or testing it.",
			saving: "Saving…",
			saveFailed: "Could not save these settings.",
			saveSuccess: "Connection settings saved.",
			invalidTimeout: "Enter a whole number from 1 to 300,000 milliseconds.",
			selectionCounts: "Selection counts",
			skillSummaryCount: "Skill summaries shown",
			skillMinProbability: "Minimum skill relevance probability (0–1)",
			fileRankingMaximum: "Maximum glob files for judgment ranking",
			rankedPathCount: "Ranked paths shown",
			selectionCountsHint: "Only skills at or above the minimum relevance probability are shown, up to the maximum; when none qualifies (for example a greeting), no skill summary is shown. If glob finds more files than the ranking maximum, judgment ranking is skipped and the original glob result is returned.",
			selectionCountInvalid: "Enter a positive whole number.",
			selectionProbabilityInvalid: "Enter a probability from 0 to 1.",
			saveSelectionCounts: "Save selection counts",
			selectionCountSaved: "Selection counts saved.",
			selectionCountSaveFailed: "Could not save selection counts.",
			outputAdmissionSettings: "Tool log admission limits",
			outputAdmissionHint: "These limits apply to the next eligible tool result. The two feature switches above remain independent and off by default.",
			outputAdmissionInvalid: "Enter a valid positive number, or a probability between 0 and 1.",
			saveOutputAdmission: "Save log limits",
			outputAdmissionSaved: "Log limits saved.",
			outputAdmissionSaveFailed: "Could not save log limits.",
			generalMinChars: "Minimum command log characters",
			testMinChars: "Minimum test log characters",
			generalBlockChars: "Candidate block characters",
			maxGeneralBlocks: "Maximum command candidates",
			maxTestCandidates: "Maximum test candidates",
			maxRequestChars: "Judgment request characters",
			maxTaskChars: "Task context characters",
			admissionWaitMs: "Judgment wait (ms)",
			omitProbability: "Minimum omit probability",
			minSavedChars: "Minimum saved characters",
			minSavedRatio: "Minimum saved fraction",
			slowTestMs: "Slow test threshold (ms)",
			duplicateMinLines: "Duplicate failure minimum lines",
			duplicateMinChars: "Duplicate failure minimum characters",
			evidenceChars: "Judgment input character budget",
			supervisionCounts: "Supervision counts",
			driftInterval: "Completed model steps between drift checks",
			noProgressRounds: "Consecutive goal rounds without progress",
			maxSupplementRounds: "Maximum automatic supplement rounds",
			supervisionCountsHint: "All three supervision features are independent and disabled by default. Completion supplements and goal rounds without progress are separate counts. Saving counts does not enable features; native goal round limits still apply.",
			supervisionCountInvalid: "Enter a positive whole number.",
			saveSupervisionCounts: "Save supervision counts",
			supervisionCountSaved: "Supervision counts saved.",
			supervisionCountSaveFailed: "Could not save supervision counts.",
			stageSettings: "Stage analysis limits",
			stageSettingsHint: "Used only for manual analysis while stage navigation is enabled. The current step is never truncated; a request over the limit is skipped.",
			previousSteps: "Prior steps in context",
			previousChars: "Characters per prior step",
			stageMaxRequestChars: "Maximum complete request characters",
			stageConcurrency: "Concurrent judgment requests",
			stageInvalid: "Enter a whole number within the allowed range.",
			saveStageSettings: "Save stage limits",
			stageSaved: "Stage limits saved.",
			stageSaveFailed: "Could not save stage limits.",
			replaceKey: "Replace key",
			saveKey: "Save key",
			keySaved: "Key saved.",
			keySaveFailed: "Could not save the key. Refresh the saved connection before retrying.",
			testConnection: "Test connection",
			testing: "Testing…",
			testSucceeded: "Connection test passed.",
			testFailed: "Connection test failed.",
			latency: "Latency",
			enable: "Enable",
			disable: "Disable",
			refreshFeatures: "Refresh features",
			featureSaveFailed: "Could not change this feature.",
			featureLoadFailed: "Could not load features.",
			retry: "Retry",
			allFeatures: "All features",
			allStatuses: "All statuses",
			sessionId: "Session ID",
			applyFilters: "Apply filters",
			refresh: "Refresh",
			noRecords: "No decision records match these filters.",
			recordsFailed: "Could not refresh records. Existing records are still shown.",
			loadMore: "Load more",
			details: "Details",
			closeDetails: "Close details",
			detailFailed: "Could not load this record.",
			operation: "Operation",
			attempts: "Attempts",
			receipts: "Action receipts",
			input: "Input state",
			questions: "Questions",
			answer: "Normalized answer",
			rawAnswer: "Raw response",
			connectionIdentity: "Connection",
			usage: "Reported usage",
			failure: "Failure",
			interpretation: "Interpretation",
			actualAction: "Actual action",
			time: "Time",
			status: "Status",
			feature: "Feature",
			kind: "Kind",
			noDetail: "No details for this record.",
			diagnostic: "Connection diagnostic",
			pending: "Pending",
			waiting: "Waiting",
			succeeded: "Succeeded",
			failed: "Failed",
			cancelled: "Cancelled",
			interrupted: "Interrupted",
			unconfirmed: "Unconfirmed",
			notAdopted: "Not adopted",
			executed: "Executed",
			executionFailed: "Execution failed",
			observed: "Observed"
		};
		/** Simplified Chinese copy. */
		const zh = {
			sharedFindingsName: "共享发现纠正",
			sharedFindingsDescription: "比较已共享报告和消息，纠正实际接收者，并将冲突交给主代理核实。",
			stageNavigationName: "阶段导航",
			stageNavigationDescription: "手动分类会话中的完整步骤，并按轮次浏览连续目的阶段",
			mcpSelectionName: "MCP 自动选择",
			mcpSelectionDescription: "为当前任务筛选 native MCP 工具定义。PTC 模式保留宿主原工具；不安装或连接服务，不修改权限。",
			mcpSelectionSettings: "MCP 自动选择设置",
			mcpSelectionHint: "仅筛选 native MCP 工具定义，PTC 模式保留宿主原工具。不安装或连接服务，不修改权限。保存设置不会启用此功能。",
			mcpSelectionBudgetHint: "自动预算并非工具总数上限：固定保留的工具与通过 mcp_load 补载的工具可超过预算。预算为 0 时不自动选择工具。",
			mcpToolLimit: "自动工具预算（0–1,000）",
			mcpMinProbability: "最低选择概率（0–1）",
			mcpAllowZero: "允许自动选择零个工具",
			mcpAllowZeroHint: "关闭时，即使未达到概率门槛，也至少选择一个可用候选工具；自动预算必须至少为 1。",
			mcpPinnedTools: "固定保留的工具名",
			mcpPinnedToolsHint: "每行一个完整工具名，不支持通配符。自动去除首尾空白与重复名称；留空表示不固定保留工具。",
			mcpWaitMs: "判断等待时间（1–300,000 毫秒）",
			mcpMaxRequestChars: "请求字符上限（2,048–1,000,000）",
			mcpToolLimitInvalid: "请输入 0 到 1,000 之间的整数",
			mcpProbabilityInvalid: "请输入 0 到 1 之间的概率",
			mcpWaitInvalid: "请输入 1 到 300,000 之间的整数毫秒数",
			mcpRequestInvalid: "请输入 2,048 到 1,000,000 之间的整数字符数",
			mcpPinsInvalid: "请使用完整工具名，不要包含通配符（*、?、[ 或 ]）",
			mcpZeroInvalid: "请允许选择零个工具，或将自动工具预算增加至至少 1",
			saveMcpSelection: "保存 MCP 选择设置",
			mcpSelectionSaved: "MCP 选择设置已保存",
			mcpSelectionSaveFailed: "无法保存 MCP 选择设置，已保留编辑内容；请检查后重试",
			tabs: "Jev 页面",
			settings: "设置与功能",
			records: "判断记录",
			connection: "共用连接",
			features: "功能目录",
			noFeatures: "当前没有登记的功能",
			baseUrl: "服务地址",
			model: "模型",
			credentialRef: "凭据引用",
			timeoutMs: "超时（毫秒）",
			decisionModel: "判断模型",
			jevModel: "Jev",
			lunaModel: "Luna Decisions",
			lunaApi: "Luna API",
			openRouter: "OpenRouter",
			openAI: "OpenAI",
			lunaModelHint: "此 API 使用上方显示的固定 Luna Decisions 模型",
			connectionHint: "已启用功能共用已保存的判断连接；主 Agent 模型在 DSH 中单独配置",
			diagnosticHint: "用固定 Choice、Score、Noul 问题测试已保存连接，不发送用户任务内容",
			connectionChanged: "连接已改变，请刷新已保存设置后重试",
			providerRequests: "提供方请求",
			requestBody: "实际发送请求",
			questionIds: "问题 ID",
			reportedModel: "返回模型",
			requestId: "提供方请求 ID",
			usageIncomplete: "用量不完整，部分请求未报告用量",
			apiKey: "API 密钥",
			apiKeyHint: "写入宿主凭据；这里不会读回已保存的密钥",
			configured: "已配置",
			missing: "缺失",
			readOnly: "只读",
			unavailable: "设置暂不可用",
			loading: "加载中…",
			saveConnection: "保存连接",
			saveFirst: "请先保存连接，再替换密钥或测试连接",
			saving: "保存中…",
			saveFailed: "无法保存这些设置",
			saveSuccess: "连接设置已保存",
			invalidTimeout: "请输入 1 到 300,000 之间的整数毫秒数",
			selectionCounts: "筛选数量",
			skillSummaryCount: "展示的技能摘要数",
			skillMinProbability: "技能最低相关概率（0–1）",
			fileRankingMaximum: "判断排序最大文件数",
			rankedPathCount: "展示的已排序路径数",
			selectionCountsHint: "只展示相关概率不低于门槛的技能，数量不超过上限；没有技能达到门槛时（例如只是打招呼）不展示任何技能摘要。glob 匹配文件数超过排序上限时，跳过判断排序，直接返回原 glob 结果",
			selectionCountInvalid: "请输入正整数",
			selectionProbabilityInvalid: "请输入 0 到 1 之间的概率",
			saveSelectionCounts: "保存筛选数量",
			selectionCountSaved: "筛选数量已保存",
			selectionCountSaveFailed: "无法保存筛选数量",
			outputAdmissionSettings: "工具日志准入预算",
			outputAdmissionHint: "这些预算从下一次合格工具结果开始生效；上方两个功能开关互相独立，默认关闭。",
			outputAdmissionInvalid: "请输入有效正数；概率或比例须在 0 到 1 之间",
			saveOutputAdmission: "保存日志预算",
			outputAdmissionSaved: "日志预算已保存",
			outputAdmissionSaveFailed: "无法保存日志预算",
			generalMinChars: "命令日志最小字符数",
			testMinChars: "测试日志最小字符数",
			generalBlockChars: "候选块字符数",
			maxGeneralBlocks: "命令候选块数量上限",
			maxTestCandidates: "测试候选数量上限",
			maxRequestChars: "判断请求字符预算",
			maxTaskChars: "任务依据字符预算",
			admissionWaitMs: "判断等待毫秒数",
			omitProbability: "省略概率门槛",
			minSavedChars: "最小净省字符数",
			minSavedRatio: "最小净省比例",
			slowTestMs: "慢测试门槛（毫秒）",
			duplicateMinLines: "重复失败详情最少行数",
			duplicateMinChars: "重复失败详情最少字符数",
			evidenceChars: "判断材料字符预算",
			supervisionCounts: "执行监督次数",
			driftInterval: "跑偏检查间隔（已完成模型步骤）",
			noProgressRounds: "连续无进展目标轮数",
			maxSupplementRounds: "最多自动补充轮数",
			supervisionCountsHint: "三项监督功能独立开关，默认关闭。自动补充与目标无进展轮数分别计数；保存参数不会开启功能，目标总轮数仍遵守原生上限",
			supervisionCountInvalid: "请输入正整数",
			saveSupervisionCounts: "保存监督次数",
			supervisionCountSaved: "监督次数已保存",
			supervisionCountSaveFailed: "无法保存监督次数",
			stageSettings: "阶段分析预算",
			stageSettingsHint: "仅在启用阶段导航并手动分析时使用。当前完整步骤不会截断；请求超限时跳过分类",
			previousSteps: "纳入上下文的前序步骤数",
			previousChars: "每个前序步骤的字符数",
			stageMaxRequestChars: "完整请求字符上限",
			stageConcurrency: "同时发起的判断请求数",
			stageInvalid: "请输入允许范围内的整数",
			saveStageSettings: "保存阶段预算",
			stageSaved: "阶段预算已保存",
			stageSaveFailed: "无法保存阶段预算",
			replaceKey: "替换密钥",
			saveKey: "保存密钥",
			keySaved: "密钥已保存",
			keySaveFailed: "无法保存密钥，请刷新已保存连接后重试",
			testConnection: "测试连接",
			testing: "测试中…",
			testSucceeded: "连接测试通过",
			testFailed: "连接测试失败",
			latency: "耗时",
			enable: "启用",
			disable: "关闭",
			refreshFeatures: "刷新功能",
			featureSaveFailed: "无法修改此功能",
			featureLoadFailed: "无法加载功能目录",
			retry: "重试",
			allFeatures: "全部功能",
			allStatuses: "全部状态",
			sessionId: "会话 ID",
			applyFilters: "应用筛选",
			refresh: "刷新",
			noRecords: "没有符合条件的判断记录",
			recordsFailed: "无法刷新记录，已保留现有内容",
			loadMore: "加载更多",
			details: "详情",
			closeDetails: "关闭详情",
			detailFailed: "无法加载这条记录",
			operation: "操作",
			attempts: "尝试",
			receipts: "动作回执",
			input: "输入状态",
			questions: "问题",
			answer: "统一答案",
			rawAnswer: "原始响应",
			connectionIdentity: "连接身份",
			usage: "服务报告用量",
			failure: "失败原因",
			interpretation: "业务解释",
			actualAction: "实际动作",
			time: "时间",
			status: "状态",
			feature: "功能",
			kind: "类型",
			noDetail: "这条记录没有详情",
			diagnostic: "连接诊断",
			pending: "进行中",
			waiting: "等待处理",
			succeeded: "判断成功",
			failed: "失败",
			cancelled: "已取消",
			interrupted: "已中断",
			unconfirmed: "未确认",
			notAdopted: "未采用",
			executed: "已执行",
			executionFailed: "执行失败",
			observed: "已观察"
		};
		//#endregion
		//#region src/client/remote-adapter.ts
		function unwrap(result) {
			if (!result.ok) throw result.error;
			return result.value;
		}
		/**
		* Adapt every Jev Remote call to the page's Promise-of-value API.
		* @param remote - generated Remote namespace, whose carrier and Host failures resolve as `RemoteResult`.
		* @returns page commands that resolve to business values or reject with the Remote failure.
		*/
		function jevPageRemote(remote) {
			return {
				listFeatures: async () => unwrap(await remote.listFeatures()),
				listRecords: async (filter) => unwrap(await remote.listRecords(filter)),
				getRecord: async (id) => unwrap(await remote.getRecord(id)),
				testConnection: async (connection, signal) => unwrap(await remote.testConnection(connection, signal)),
				getCredentialStatus: async (connection) => unwrap(await remote.getCredentialStatus(connection)),
				setCredential: async (connection, value) => unwrap(await remote.setCredential(connection, value))
			};
		}
		/** Adapt the Session stage commands while retaining their Host authorization. */
		function jevStageRemote(remote) {
			return {
				getStageNavigation: async (sessionId, signal) => unwrap(await remote.getStageNavigation(sessionId, signal)),
				startStageAnalysis: async (request) => unwrap(await remote.startStageAnalysis(request)),
				cancelStageAnalysis: async (batchId) => unwrap(await remote.cancelStageAnalysis(batchId)),
				getStageAnalysisRecord: async (sessionId, stepId, recordId) => unwrap(await (recordId === void 0 ? remote.getStageAnalysisRecord(sessionId, stepId) : remote.getStageAnalysisRecord(sessionId, stepId, recordId)))
			};
		}
		//#endregion
		//#region src/client/mount.ts
		const NS = "jev.plugin";
		const STAGE_NS = "jev.stage";
		const PACKAGE = "@dsh-jev/plugin";
		const ENTRY = "jev";
		const SELECTION_ENTRY = "jev-selection";
		const OUTPUT_ENTRY = "jev-output-admission";
		/** Services needed after the generated Jev Remote contribution mounts. */
		const inject = [
			"remote",
			"slots",
			"locale",
			"configForms"
		];
		function registerUi(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}));
			ctx.effect(() => ctx.locale.register(STAGE_NS, {
				zh: stageZh,
				en: stageEn
			}));
			const form = ctx.configForms.get(ENTRY);
			const selectionForm = ctx.configForms.get(SELECTION_ENTRY);
			const mcpSelectionForm = ctx.configForms.get("jev-mcp-selection");
			const outputAdmissionForm = ctx.configForms.get(OUTPUT_ENTRY);
			const supervisionForm = ctx.configForms.get("jev-supervision");
			const stageNavigationForm = ctx.configForms.get("jev-stage-navigation");
			const toast = (0, _deepseek_ai_dsh_client_store.createSnapshotStore)(null);
			let sequence = 0;
			const dismiss = () => {
				toast.set(null);
			};
			const notifySuccess = (message) => {
				toast.set({
					sequence: ++sequence,
					text: message
				});
			};
			const face = {
				form,
				selectionForm,
				mcpSelectionForm,
				supervisionForm,
				outputAdmissionForm,
				stageNavigationForm,
				jev: jevPageRemote(ctx.remote.jev),
				notifySuccess
			};
			ctx.slots.inject("shell.overlay", () => ctx.slots.register({
				name: "shell.overlay",
				id: "jev.feedback",
				inject: () => ({
					hooks: { jevToast: toast },
					dismiss
				})
			}, JevToast));
			ctx.effect(() => ctx.configForms.whileServed([ENTRY], () => ctx.slots.inject("plugins.bundle.config", () => ctx.slots.register({
				name: "plugins.bundle.config",
				key: PACKAGE,
				locale: NS,
				inject: () => face
			}, JevPage))));
			const stageT = ctx.locale.bind(STAGE_NS);
			const stageRemote = jevStageRemote(ctx.remote.jev);
			ctx.effect(() => watchStageView(form, () => ctx.slots.inject("conversation.view", () => ctx.slots.register({
				name: "conversation.view",
				id: "jev-stage-navigation",
				order: 20,
				locale: STAGE_NS,
				label: () => stageT("title"),
				inject: (sessionId) => ({
					sessionId,
					jev: stageRemote
				})
			}, StageNavigation))));
		}
		/**
		* Mount Jev's generated Remote first, then register the bundle page while its settings entry is served.
		* @param ctx - Client runtime with Remote, locale, slots, and config forms.
		* @param contribution - generated Jev Remote namespace.
		* @returns disposer for both Remote and UI registrations.
		*/
		async function mountJevUi(ctx, contribution) {
			const disposeRemote = await ctx.remote.$mount(contribution);
			const ui = ctx.inject([
				"remote.jev",
				"slots",
				"locale",
				"configForms"
			], registerUi);
			try {
				await ui;
			} catch (error) {
				await ui.dispose();
				await disposeRemote();
				throw error;
			}
			return async () => {
				await ui.dispose();
				await disposeRemote();
			};
		}
		//#endregion
		//#region src/client/index.ts
		/** Activate Jev's browser contribution. */
		async function apply(ctx) {
			return await mountJevUi(ctx, TYPERT_REMOTE);
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map
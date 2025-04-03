"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metrics = metrics;
exports.prometheusRegister = void 0;
var _promClient = _interopRequireDefault(require("prom-client"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/*
 * Copyright 2021 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const register = new _promClient.default.Registry();
async function metrics(req, res) {
  /**
     #swagger.tags = ["Misc"]
     #swagger.autoBody=false
     #swagger.description = 'This endpoint can be used to check the status of API metrics. It returns a response with the collected metrics.'
     }
   */
  const register = new _promClient.default.Registry();
  register.setDefaultLabels({
    app: 'wppconnect-server'
  });
  _promClient.default.collectDefaultMetrics({
    register
  });
  res.setHeader('Content-Type', register.contentType);
  register.metrics().then(data => res.status(200).send(data));
}
const prometheusRegister = exports.prometheusRegister = register;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcHJvbUNsaWVudCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiZSIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0IiwicmVnaXN0ZXIiLCJQcm9tZXRoZXVzIiwiUmVnaXN0cnkiLCJtZXRyaWNzIiwicmVxIiwicmVzIiwic2V0RGVmYXVsdExhYmVscyIsImFwcCIsImNvbGxlY3REZWZhdWx0TWV0cmljcyIsInNldEhlYWRlciIsImNvbnRlbnRUeXBlIiwidGhlbiIsImRhdGEiLCJzdGF0dXMiLCJzZW5kIiwicHJvbWV0aGV1c1JlZ2lzdGVyIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlL2luc3RydW1lbnRhdGlvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjEgV1BQQ29ubmVjdCBUZWFtXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgUHJvbWV0aGV1cyBmcm9tICdwcm9tLWNsaWVudCc7XG5cbmNvbnN0IHJlZ2lzdGVyID0gbmV3IFByb21ldGhldXMuUmVnaXN0cnkoKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1ldHJpY3MocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAjc3dhZ2dlci50YWdzID0gW1wiTWlzY1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5kZXNjcmlwdGlvbiA9ICdUaGlzIGVuZHBvaW50IGNhbiBiZSB1c2VkIHRvIGNoZWNrIHRoZSBzdGF0dXMgb2YgQVBJIG1ldHJpY3MuIEl0IHJldHVybnMgYSByZXNwb25zZSB3aXRoIHRoZSBjb2xsZWN0ZWQgbWV0cmljcy4nXG4gICAgIH1cbiAgICovXG4gIGNvbnN0IHJlZ2lzdGVyID0gbmV3IFByb21ldGhldXMuUmVnaXN0cnkoKTtcbiAgcmVnaXN0ZXIuc2V0RGVmYXVsdExhYmVscyh7XG4gICAgYXBwOiAnd3BwY29ubmVjdC1zZXJ2ZXInLFxuICB9KTtcbiAgUHJvbWV0aGV1cy5jb2xsZWN0RGVmYXVsdE1ldHJpY3MoeyByZWdpc3RlciB9KTtcblxuICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCByZWdpc3Rlci5jb250ZW50VHlwZSk7XG4gIHJlZ2lzdGVyLm1ldHJpY3MoKS50aGVuKChkYXRhKSA9PiByZXMuc3RhdHVzKDIwMCkuc2VuZChkYXRhKSk7XG59XG5leHBvcnQgY29uc3QgcHJvbWV0aGV1c1JlZ2lzdGVyID0gcmVnaXN0ZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFpQkEsSUFBQUEsV0FBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQXFDLFNBQUFELHVCQUFBRSxDQUFBLFdBQUFBLENBQUEsSUFBQUEsQ0FBQSxDQUFBQyxVQUFBLEdBQUFELENBQUEsS0FBQUUsT0FBQSxFQUFBRixDQUFBO0FBakJyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBS0EsTUFBTUcsUUFBUSxHQUFHLElBQUlDLG1CQUFVLENBQUNDLFFBQVEsQ0FBQyxDQUFDO0FBRW5DLGVBQWVDLE9BQU9BLENBQUNDLEdBQVksRUFBRUMsR0FBYSxFQUFFO0VBQ3pEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFLE1BQU1MLFFBQVEsR0FBRyxJQUFJQyxtQkFBVSxDQUFDQyxRQUFRLENBQUMsQ0FBQztFQUMxQ0YsUUFBUSxDQUFDTSxnQkFBZ0IsQ0FBQztJQUN4QkMsR0FBRyxFQUFFO0VBQ1AsQ0FBQyxDQUFDO0VBQ0ZOLG1CQUFVLENBQUNPLHFCQUFxQixDQUFDO0lBQUVSO0VBQVMsQ0FBQyxDQUFDO0VBRTlDSyxHQUFHLENBQUNJLFNBQVMsQ0FBQyxjQUFjLEVBQUVULFFBQVEsQ0FBQ1UsV0FBVyxDQUFDO0VBQ25EVixRQUFRLENBQUNHLE9BQU8sQ0FBQyxDQUFDLENBQUNRLElBQUksQ0FBRUMsSUFBSSxJQUFLUCxHQUFHLENBQUNRLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDRixJQUFJLENBQUMsQ0FBQztBQUMvRDtBQUNPLE1BQU1HLGtCQUFrQixHQUFBQyxPQUFBLENBQUFELGtCQUFBLEdBQUdmLFFBQVEiLCJpZ25vcmVMaXN0IjpbXX0=
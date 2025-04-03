"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encryptSession = encryptSession;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
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

const saltRounds = 10;
async function encryptSession(req, res) {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.parameters['secretkey'] = {
       schema: 'THISISMYSECURETOKEN',
     }
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.autoHeaders = false
   */
  const {
    session,
    secretkey
  } = req.params;
  const {
    authorization: token
  } = req.headers;
  const secureTokenEnv = req.serverOptions.secretKey;
  let tokenDecrypt = '';
  if (secretkey === undefined) {
    tokenDecrypt = token.split(' ')[0];
  } else {
    tokenDecrypt = secretkey;
  }
  if (tokenDecrypt !== secureTokenEnv) {
    return res.status(400).json({
      response: false,
      message: 'The SECRET_KEY is incorrect'
    });
  }
  _bcrypt.default.hash(session + secureTokenEnv, saltRounds, function (err, hash) {
    if (err) return res.status(500).json(err);
    const hashFormat = hash.replace(/\//g, '_').replace(/\+/g, '-');
    return res.status(201).json({
      status: 'success',
      session: session,
      token: hashFormat,
      full: `${session}:${hashFormat}`
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfYmNyeXB0IiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJlIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJzYWx0Um91bmRzIiwiZW5jcnlwdFNlc3Npb24iLCJyZXEiLCJyZXMiLCJzZXNzaW9uIiwic2VjcmV0a2V5IiwicGFyYW1zIiwiYXV0aG9yaXphdGlvbiIsInRva2VuIiwiaGVhZGVycyIsInNlY3VyZVRva2VuRW52Iiwic2VydmVyT3B0aW9ucyIsInNlY3JldEtleSIsInRva2VuRGVjcnlwdCIsInVuZGVmaW5lZCIsInNwbGl0Iiwic3RhdHVzIiwianNvbiIsInJlc3BvbnNlIiwibWVzc2FnZSIsImJjcnlwdCIsImhhc2giLCJlcnIiLCJoYXNoRm9ybWF0IiwicmVwbGFjZSIsImZ1bGwiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlci9lbmNyeXB0Q29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjEgV1BQQ29ubmVjdCBUZWFtXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdCc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuXG5jb25zdCBzYWx0Um91bmRzID0gMTA7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBlbmNyeXB0U2Vzc2lvbihcbiAgcmVxOiBSZXF1ZXN0LFxuICByZXM6IFJlc3BvbnNlXG4pOiBQcm9taXNlPGFueT4ge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFsnQXV0aCddXG4gICAqICNzd2FnZ2VyLnBhcmFtZXRlcnNbJ3NlY3JldGtleSddID0ge1xuICAgICAgIHNjaGVtYTogJ1RISVNJU01ZU0VDVVJFVE9LRU4nLFxuICAgICB9XG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIuYXV0b0hlYWRlcnMgPSBmYWxzZVxuICAgKi9cbiAgY29uc3QgeyBzZXNzaW9uLCBzZWNyZXRrZXkgfSA9IHJlcS5wYXJhbXM7XG4gIGNvbnN0IHsgYXV0aG9yaXphdGlvbjogdG9rZW4gfSA9IHJlcS5oZWFkZXJzO1xuICBjb25zdCBzZWN1cmVUb2tlbkVudiA9IHJlcS5zZXJ2ZXJPcHRpb25zLnNlY3JldEtleTtcblxuICBsZXQgdG9rZW5EZWNyeXB0ID0gJyc7XG5cbiAgaWYgKHNlY3JldGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdG9rZW5EZWNyeXB0ID0gKHRva2VuIGFzIHN0cmluZykuc3BsaXQoJyAnKVswXTtcbiAgfSBlbHNlIHtcbiAgICB0b2tlbkRlY3J5cHQgPSBzZWNyZXRrZXk7XG4gIH1cblxuICBpZiAodG9rZW5EZWNyeXB0ICE9PSBzZWN1cmVUb2tlbkVudikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7XG4gICAgICByZXNwb25zZTogZmFsc2UsXG4gICAgICBtZXNzYWdlOiAnVGhlIFNFQ1JFVF9LRVkgaXMgaW5jb3JyZWN0JyxcbiAgICB9KTtcbiAgfVxuXG4gIGJjcnlwdC5oYXNoKHNlc3Npb24gKyBzZWN1cmVUb2tlbkVudiwgc2FsdFJvdW5kcywgZnVuY3Rpb24gKGVyciwgaGFzaCkge1xuICAgIGlmIChlcnIpIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbihlcnIpO1xuXG4gICAgY29uc3QgaGFzaEZvcm1hdCA9IGhhc2gucmVwbGFjZSgvXFwvL2csICdfJykucmVwbGFjZSgvXFwrL2csICctJyk7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAxKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ3N1Y2Nlc3MnLFxuICAgICAgc2Vzc2lvbjogc2Vzc2lvbixcbiAgICAgIHRva2VuOiBoYXNoRm9ybWF0LFxuICAgICAgZnVsbDogYCR7c2Vzc2lvbn06JHtoYXNoRm9ybWF0fWAsXG4gICAgfSk7XG4gIH0pO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFlQSxJQUFBQSxPQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFBNEIsU0FBQUQsdUJBQUFFLENBQUEsV0FBQUEsQ0FBQSxJQUFBQSxDQUFBLENBQUFDLFVBQUEsR0FBQUQsQ0FBQSxLQUFBRSxPQUFBLEVBQUFGLENBQUE7QUFmNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUlBLE1BQU1HLFVBQVUsR0FBRyxFQUFFO0FBRWQsZUFBZUMsY0FBY0EsQ0FDbENDLEdBQVksRUFDWkMsR0FBYSxFQUNDO0VBQ2Q7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDRSxNQUFNO0lBQUVDLE9BQU87SUFBRUM7RUFBVSxDQUFDLEdBQUdILEdBQUcsQ0FBQ0ksTUFBTTtFQUN6QyxNQUFNO0lBQUVDLGFBQWEsRUFBRUM7RUFBTSxDQUFDLEdBQUdOLEdBQUcsQ0FBQ08sT0FBTztFQUM1QyxNQUFNQyxjQUFjLEdBQUdSLEdBQUcsQ0FBQ1MsYUFBYSxDQUFDQyxTQUFTO0VBRWxELElBQUlDLFlBQVksR0FBRyxFQUFFO0VBRXJCLElBQUlSLFNBQVMsS0FBS1MsU0FBUyxFQUFFO0lBQzNCRCxZQUFZLEdBQUlMLEtBQUssQ0FBWU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRCxDQUFDLE1BQU07SUFDTEYsWUFBWSxHQUFHUixTQUFTO0VBQzFCO0VBRUEsSUFBSVEsWUFBWSxLQUFLSCxjQUFjLEVBQUU7SUFDbkMsT0FBT1AsR0FBRyxDQUFDYSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztNQUMxQkMsUUFBUSxFQUFFLEtBQUs7TUFDZkMsT0FBTyxFQUFFO0lBQ1gsQ0FBQyxDQUFDO0VBQ0o7RUFFQUMsZUFBTSxDQUFDQyxJQUFJLENBQUNqQixPQUFPLEdBQUdNLGNBQWMsRUFBRVYsVUFBVSxFQUFFLFVBQVVzQixHQUFHLEVBQUVELElBQUksRUFBRTtJQUNyRSxJQUFJQyxHQUFHLEVBQUUsT0FBT25CLEdBQUcsQ0FBQ2EsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUNLLEdBQUcsQ0FBQztJQUV6QyxNQUFNQyxVQUFVLEdBQUdGLElBQUksQ0FBQ0csT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQ0EsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7SUFDL0QsT0FBT3JCLEdBQUcsQ0FBQ2EsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7TUFDMUJELE1BQU0sRUFBRSxTQUFTO01BQ2pCWixPQUFPLEVBQUVBLE9BQU87TUFDaEJJLEtBQUssRUFBRWUsVUFBVTtNQUNqQkUsSUFBSSxFQUFFLEdBQUdyQixPQUFPLElBQUltQixVQUFVO0lBQ2hDLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztBQUNKIiwiaWdub3JlTGlzdCI6W119
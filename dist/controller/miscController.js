"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backupAllSessions = backupAllSessions;
exports.clearSessionData = clearSessionData;
exports.restoreAllSessions = restoreAllSessions;
exports.setLimit = setLimit;
exports.takeScreenshot = takeScreenshot;
var _fs = _interopRequireDefault(require("fs"));
var _ = require("..");
var _config = _interopRequireDefault(require("../config"));
var _manageSession = require("../util/manageSession");
var _sessionUtil = require("../util/sessionUtil");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/*
 * Copyright 2023 WPPConnect Team
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

async function backupAllSessions(req, res) {
  /**
     * #swagger.tags = ["Misc"]
     * #swagger.description = 'Please, open the router in your browser, in swagger this not run'
     * #swagger.produces = ['application/octet-stream']
     * #swagger.consumes = ['application/octet-stream']
       #swagger.autoBody=false
       #swagger.parameters["secretkey"] = {
          required: true,
          schema: 'THISISMYSECURETOKEN'
       }
       #swagger.responses[200] = {
        description: 'A ZIP file contaings your backup. Please, open this link in your browser',
        content: {
          "application/zip": {
            schema: {}
          }
        },
      }
     */
  const {
    secretkey
  } = req.params;
  if (secretkey !== _config.default.secretKey) {
    res.status(400).json({
      response: 'error',
      message: 'The token is incorrect'
    });
  }
  try {
    res.setHeader('Content-Type', 'application/zip');
    res.send(await (0, _manageSession.backupSessions)(req));
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error on backup session',
      error: error
    });
  }
}
async function restoreAllSessions(req, res) {
  /**
   #swagger.tags = ["Misc"]
   #swagger.autoBody=false
    #swagger.parameters["secretkey"] = {
    required: true,
    schema: 'THISISMYSECURETOKEN'
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: 'object',
            properties: {
              file: {
                type: "string",
                format: "binary"
              }
            },
            required: ['file'],
          }
        }
      }
    }
  */
  const {
    secretkey
  } = req.params;
  if (secretkey !== _config.default.secretKey) {
    res.status(400).json({
      response: 'error',
      message: 'The token is incorrect'
    });
  }
  try {
    const result = await (0, _manageSession.restoreSessions)(req, req.file);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error on restore session',
      error: error
    });
  }
}
async function takeScreenshot(req, res) {
  /**
   #swagger.tags = ["Misc"]
   #swagger.autoBody=false
    #swagger.security = [{
          "bearerAuth": []
    }]
    #swagger.parameters["session"] = {
    schema: 'NERDWHATS_AMERICA'
    }
  */

  try {
    const result = await req.client.takeScreenshot();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error on take screenshot',
      error: error
    });
  }
}
async function clearSessionData(req, res) {
  /**
   #swagger.tags = ["Misc"]
   #swagger.autoBody=false
    #swagger.parameters["secretkey"] = {
    required: true,
    schema: 'THISISMYSECURETOKEN'
    }
    #swagger.parameters["session"] = {
    schema: 'NERDWHATS_AMERICA'
    }
  */

  try {
    const {
      secretkey,
      session
    } = req.params;
    if (secretkey !== _config.default.secretKey) {
      res.status(400).json({
        response: 'error',
        message: 'The token is incorrect'
      });
    }
    if (req?.client?.page) {
      delete _sessionUtil.clientsArray[req.params.session];
      await req.client.logout();
    }
    const path = _config.default.customUserDataDir + session;
    const pathToken = __dirname + `../../../tokens/${session}.data.json`;
    if (_fs.default.existsSync(path)) {
      await _fs.default.promises.rm(path, {
        recursive: true
      });
    }
    if (_fs.default.existsSync(pathToken)) {
      await _fs.default.promises.rm(pathToken);
    }
    res.status(200).json({
      success: true
    });
  } catch (error) {
    _.logger.error(error);
    res.status(500).json({
      status: false,
      message: 'Error on clear session data',
      error: error
    });
  }
}
async function setLimit(req, res) {
  /**
   #swagger.tags = ["Misc"]
   #swagger.description = 'Change limits of whatsapp web. Types value: maxMediaSize, maxFileSize, maxShare, statusVideoMaxDuration, unlimitedPin;'
   #swagger.autoBody=false
    #swagger.security = [{
          "bearerAuth": []
    }]
    #swagger.parameters["session"] = {
    schema: 'NERDWHATS_AMERICA'
    }
     #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              value: { type: 'any' },
            },
            required: ['type', 'value'],
          },
          examples: {
            'Default': {
              value: {
                type: 'maxFileSize',
                value: 104857600
              },
            },
          },
        },
      },
    }
  */

  try {
    const {
      type,
      value
    } = req.body;
    if (!type || !value) throw new Error('Send de type and value');
    const result = await req.client.setLimit(type, value);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error on set limit',
      error: error
    });
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZnMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl8iLCJfY29uZmlnIiwiX21hbmFnZVNlc3Npb24iLCJfc2Vzc2lvblV0aWwiLCJlIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJiYWNrdXBBbGxTZXNzaW9ucyIsInJlcSIsInJlcyIsInNlY3JldGtleSIsInBhcmFtcyIsImNvbmZpZyIsInNlY3JldEtleSIsInN0YXR1cyIsImpzb24iLCJyZXNwb25zZSIsIm1lc3NhZ2UiLCJzZXRIZWFkZXIiLCJzZW5kIiwiYmFja3VwU2Vzc2lvbnMiLCJlcnJvciIsInJlc3RvcmVBbGxTZXNzaW9ucyIsInJlc3VsdCIsInJlc3RvcmVTZXNzaW9ucyIsImZpbGUiLCJ0YWtlU2NyZWVuc2hvdCIsImNsaWVudCIsImNsZWFyU2Vzc2lvbkRhdGEiLCJzZXNzaW9uIiwicGFnZSIsImNsaWVudHNBcnJheSIsImxvZ291dCIsInBhdGgiLCJjdXN0b21Vc2VyRGF0YURpciIsInBhdGhUb2tlbiIsIl9fZGlybmFtZSIsImZzIiwiZXhpc3RzU3luYyIsInByb21pc2VzIiwicm0iLCJyZWN1cnNpdmUiLCJzdWNjZXNzIiwibG9nZ2VyIiwic2V0TGltaXQiLCJ0eXBlIiwidmFsdWUiLCJib2R5IiwiRXJyb3IiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlci9taXNjQ29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjMgV1BQQ29ubmVjdCBUZWFtXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLic7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBiYWNrdXBTZXNzaW9ucywgcmVzdG9yZVNlc3Npb25zIH0gZnJvbSAnLi4vdXRpbC9tYW5hZ2VTZXNzaW9uJztcbmltcG9ydCB7IGNsaWVudHNBcnJheSB9IGZyb20gJy4uL3V0aWwvc2Vzc2lvblV0aWwnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYmFja3VwQWxsU2Vzc2lvbnMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJNaXNjXCJdXG4gICAgICogI3N3YWdnZXIuZGVzY3JpcHRpb24gPSAnUGxlYXNlLCBvcGVuIHRoZSByb3V0ZXIgaW4geW91ciBicm93c2VyLCBpbiBzd2FnZ2VyIHRoaXMgbm90IHJ1bidcbiAgICAgKiAjc3dhZ2dlci5wcm9kdWNlcyA9IFsnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJ11cbiAgICAgKiAjc3dhZ2dlci5jb25zdW1lcyA9IFsnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJ11cbiAgICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZWNyZXRrZXlcIl0gPSB7XG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgc2NoZW1hOiAnVEhJU0lTTVlTRUNVUkVUT0tFTidcbiAgICAgICB9XG4gICAgICAgI3N3YWdnZXIucmVzcG9uc2VzWzIwMF0gPSB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnQSBaSVAgZmlsZSBjb250YWluZ3MgeW91ciBiYWNrdXAuIFBsZWFzZSwgb3BlbiB0aGlzIGxpbmsgaW4geW91ciBicm93c2VyJyxcbiAgICAgICAgY29udGVudDoge1xuICAgICAgICAgIFwiYXBwbGljYXRpb24vemlwXCI6IHtcbiAgICAgICAgICAgIHNjaGVtYToge31cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgICovXG4gIGNvbnN0IHsgc2VjcmV0a2V5IH0gPSByZXEucGFyYW1zO1xuXG4gIGlmIChzZWNyZXRrZXkgIT09IGNvbmZpZy5zZWNyZXRLZXkpIHtcbiAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7XG4gICAgICByZXNwb25zZTogJ2Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdUaGUgdG9rZW4gaXMgaW5jb3JyZWN0JyxcbiAgICB9KTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3ppcCcpO1xuICAgIHJlcy5zZW5kKGF3YWl0IGJhY2t1cFNlc3Npb25zKHJlcSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICBtZXNzYWdlOiAnRXJyb3Igb24gYmFja3VwIHNlc3Npb24nLFxuICAgICAgZXJyb3I6IGVycm9yLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXN0b3JlQWxsU2Vzc2lvbnMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgI3N3YWdnZXIudGFncyA9IFtcIk1pc2NcIl1cbiAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlY3JldGtleVwiXSA9IHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBzY2hlbWE6ICdUSElTSVNNWVNFQ1VSRVRPS0VOJ1xuICAgIH1cbiAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgY29udGVudDoge1xuICAgICAgICBcIm11bHRpcGFydC9mb3JtLWRhdGFcIjoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIGZpbGU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogXCJiaW5hcnlcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVxdWlyZWQ6IFsnZmlsZSddLFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgKi9cbiAgY29uc3QgeyBzZWNyZXRrZXkgfSA9IHJlcS5wYXJhbXM7XG5cbiAgaWYgKHNlY3JldGtleSAhPT0gY29uZmlnLnNlY3JldEtleSkge1xuICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcbiAgICAgIHJlc3BvbnNlOiAnZXJyb3InLFxuICAgICAgbWVzc2FnZTogJ1RoZSB0b2tlbiBpcyBpbmNvcnJlY3QnLFxuICAgIH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXN0b3JlU2Vzc2lvbnMocmVxLCByZXEuZmlsZSBhcyBhbnkpO1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc3VsdCk7XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgbWVzc2FnZTogJ0Vycm9yIG9uIHJlc3RvcmUgc2Vzc2lvbicsXG4gICAgICBlcnJvcjogZXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRha2VTY3JlZW5zaG90KHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICNzd2FnZ2VyLnRhZ3MgPSBbXCJNaXNjXCJdXG4gICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICB9XVxuICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgIH1cbiAgKi9cblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlcS5jbGllbnQudGFrZVNjcmVlbnNob3QoKTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQpO1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBvbiB0YWtlIHNjcmVlbnNob3QnLFxuICAgICAgZXJyb3I6IGVycm9yLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjbGVhclNlc3Npb25EYXRhKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICNzd2FnZ2VyLnRhZ3MgPSBbXCJNaXNjXCJdXG4gICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZWNyZXRrZXlcIl0gPSB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgc2NoZW1hOiAnVEhJU0lTTVlTRUNVUkVUT0tFTidcbiAgICB9XG4gICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgfVxuICAqL1xuXG4gIHRyeSB7XG4gICAgY29uc3QgeyBzZWNyZXRrZXksIHNlc3Npb24gfSA9IHJlcS5wYXJhbXM7XG5cbiAgICBpZiAoc2VjcmV0a2V5ICE9PSBjb25maWcuc2VjcmV0S2V5KSB7XG4gICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7XG4gICAgICAgIHJlc3BvbnNlOiAnZXJyb3InLFxuICAgICAgICBtZXNzYWdlOiAnVGhlIHRva2VuIGlzIGluY29ycmVjdCcsXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHJlcT8uY2xpZW50Py5wYWdlKSB7XG4gICAgICBkZWxldGUgY2xpZW50c0FycmF5W3JlcS5wYXJhbXMuc2Vzc2lvbl07XG4gICAgICBhd2FpdCByZXEuY2xpZW50LmxvZ291dCgpO1xuICAgIH1cbiAgICBjb25zdCBwYXRoID0gY29uZmlnLmN1c3RvbVVzZXJEYXRhRGlyICsgc2Vzc2lvbjtcbiAgICBjb25zdCBwYXRoVG9rZW4gPSBfX2Rpcm5hbWUgKyBgLi4vLi4vLi4vdG9rZW5zLyR7c2Vzc2lvbn0uZGF0YS5qc29uYDtcbiAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoKSkge1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMucm0ocGF0aCwge1xuICAgICAgICByZWN1cnNpdmU6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aFRva2VuKSkge1xuICAgICAgYXdhaXQgZnMucHJvbWlzZXMucm0ocGF0aFRva2VuKTtcbiAgICB9XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgbG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgbWVzc2FnZTogJ0Vycm9yIG9uIGNsZWFyIHNlc3Npb24gZGF0YScsXG4gICAgICBlcnJvcjogZXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldExpbWl0KHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICNzd2FnZ2VyLnRhZ3MgPSBbXCJNaXNjXCJdXG4gICAjc3dhZ2dlci5kZXNjcmlwdGlvbiA9ICdDaGFuZ2UgbGltaXRzIG9mIHdoYXRzYXBwIHdlYi4gVHlwZXMgdmFsdWU6IG1heE1lZGlhU2l6ZSwgbWF4RmlsZVNpemUsIG1heFNoYXJlLCBzdGF0dXNWaWRlb01heER1cmF0aW9uLCB1bmxpbWl0ZWRQaW47J1xuICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgfV1cbiAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICB9XG4gICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBjb250ZW50OiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIHR5cGU6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgdmFsdWU6IHsgdHlwZTogJ2FueScgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXF1aXJlZDogWyd0eXBlJywgJ3ZhbHVlJ10sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgJ0RlZmF1bHQnOiB7XG4gICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ21heEZpbGVTaXplJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogMTA0ODU3NjAwXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH1cbiAgKi9cblxuICB0cnkge1xuICAgIGNvbnN0IHsgdHlwZSwgdmFsdWUgfSA9IHJlcS5ib2R5O1xuICAgIGlmICghdHlwZSB8fCAhdmFsdWUpIHRocm93IG5ldyBFcnJvcignU2VuZCBkZSB0eXBlIGFuZCB2YWx1ZScpO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVxLmNsaWVudC5zZXRMaW1pdCh0eXBlLCB2YWx1ZSk7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzdWx0KTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICBtZXNzYWdlOiAnRXJyb3Igb24gc2V0IGxpbWl0JyxcbiAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9KTtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBaUJBLElBQUFBLEdBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUVBLElBQUFDLENBQUEsR0FBQUQsT0FBQTtBQUNBLElBQUFFLE9BQUEsR0FBQUgsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFHLGNBQUEsR0FBQUgsT0FBQTtBQUNBLElBQUFJLFlBQUEsR0FBQUosT0FBQTtBQUFtRCxTQUFBRCx1QkFBQU0sQ0FBQSxXQUFBQSxDQUFBLElBQUFBLENBQUEs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
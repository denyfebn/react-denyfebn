"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
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

const storage = _multer.default.diskStorage({
  destination: function (req, file, cb) {
    const __dirname = _path.default.resolve(_path.default.dirname(''));
    cb(null, _path.default.resolve(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const filename = `wppConnect-${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});
const uploads = (0, _multer.default)({
  storage: storage
});
var _default = exports.default = uploads;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbXVsdGVyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfcGF0aCIsImUiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsInN0b3JhZ2UiLCJtdWx0ZXIiLCJkaXNrU3RvcmFnZSIsImRlc3RpbmF0aW9uIiwicmVxIiwiZmlsZSIsImNiIiwiX19kaXJuYW1lIiwicGF0aCIsInJlc29sdmUiLCJkaXJuYW1lIiwiZmlsZW5hbWUiLCJEYXRlIiwibm93Iiwib3JpZ2luYWxuYW1lIiwidXBsb2FkcyIsIl9kZWZhdWx0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvdXBsb2FkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMSBXUFBDb25uZWN0IFRlYW1cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmltcG9ydCBtdWx0ZXIgZnJvbSAnbXVsdGVyJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jb25zdCBzdG9yYWdlID0gbXVsdGVyLmRpc2tTdG9yYWdlKHtcbiAgZGVzdGluYXRpb246IGZ1bmN0aW9uIChyZXEsIGZpbGUsIGNiKSB7XG4gICAgY29uc3QgX19kaXJuYW1lID0gcGF0aC5yZXNvbHZlKHBhdGguZGlybmFtZSgnJykpO1xuICAgIGNiKG51bGwsIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICd1cGxvYWRzJykpO1xuICB9LFxuICBmaWxlbmFtZTogZnVuY3Rpb24gKHJlcSwgZmlsZSwgY2IpIHtcbiAgICBjb25zdCBmaWxlbmFtZSA9IGB3cHBDb25uZWN0LSR7RGF0ZS5ub3coKX0tJHtmaWxlLm9yaWdpbmFsbmFtZX1gO1xuICAgIGNiKG51bGwsIGZpbGVuYW1lKTtcbiAgfSxcbn0pO1xuXG5jb25zdCB1cGxvYWRzID0gbXVsdGVyKHsgc3RvcmFnZTogc3RvcmFnZSB9KTtcbmV4cG9ydCBkZWZhdWx0IHVwbG9hZHM7XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQWVBLElBQUFBLE9BQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLEtBQUEsR0FBQUYsc0JBQUEsQ0FBQUMsT0FBQTtBQUF3QixTQUFBRCx1QkFBQUcsQ0FBQSxXQUFBQSxDQUFBLElBQUFBLENBQUEsQ0FBQUMsVUFBQSxHQUFBRCxDQUFBLEtBQUFFLE9BQUEsRUFBQUYsQ0FBQTtBQWhCeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUlBLE1BQU1HLE9BQU8sR0FBR0MsZUFBTSxDQUFDQyxXQUFXLENBQUM7RUFDakNDLFdBQVcsRUFBRSxTQUFBQSxDQUFVQyxHQUFHLEVBQUVDLElBQUksRUFBRUMsRUFBRSxFQUFFO0lBQ3BDLE1BQU1DLFNBQVMsR0FBR0MsYUFBSSxDQUFDQyxPQUFPLENBQUNELGFBQUksQ0FBQ0UsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hESixFQUFFLENBQUMsSUFBSSxFQUFFRSxhQUFJLENBQUNDLE9BQU8sQ0FBQ0YsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0VBQzlDLENBQUM7RUFDREksUUFBUSxFQUFFLFNBQUFBLENBQVVQLEdBQUcsRUFBRUMsSUFBSSxFQUFFQyxFQUFFLEVBQUU7SUFDakMsTUFBTUssUUFBUSxHQUFHLGNBQWNDLElBQUksQ0FBQ0MsR0FBRyxDQUFDLENBQUMsSUFBSVIsSUFBSSxDQUFDUyxZQUFZLEVBQUU7SUFDaEVSLEVBQUUsQ0FBQyxJQUFJLEVBQUVLLFFBQVEsQ0FBQztFQUNwQjtBQUNGLENBQUMsQ0FBQztBQUVGLE1BQU1JLE9BQU8sR0FBRyxJQUFBZCxlQUFNLEVBQUM7RUFBRUQsT0FBTyxFQUFFQTtBQUFRLENBQUMsQ0FBQztBQUFDLElBQUFnQixRQUFBLEdBQUFDLE9BQUEsQ0FBQWxCLE9BQUEsR0FDOUJnQixPQUFPIiwiaWdub3JlTGlzdCI6W119
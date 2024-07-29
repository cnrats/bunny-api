export interface ITranscodingMessage {
  timeStamp: string;
  level: 0 | 1 | 2 | 3; // 0 = Undefined, 1 = Info, 2 = Warning, 3 = Error
  issueCode: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; // 0 = Undefined, 1 = StreamLengthsDifference, 2 = TranscodingWarnings, 3 = IncompatibleResolution, 4 = InvalidFramerate, 5 = VideoExceededMaxDuration, 6 = AudioExceededMaxDuration, 7 = OriginalCorrupted, 8 = TranscriptionFailed
  message: string | null;
  value: string | null;
}

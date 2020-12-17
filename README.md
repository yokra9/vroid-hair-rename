# VRoidのヘアープリセットを管理するやつ

## 利用方法

[Node.js](https://nodejs.org/ja/) のインストールが必要です。

ダウンロードZipファイルを解凍し、初期設定を行います。
`conf/main.json` をメモ帳などで開き、`presetDir` に VRoid のヘアープリセット保存先を指定してください。一般的には下記のようになるはずです。

```json
{
  "presetDir":"C:\\Users\\<ユーザ名>\\AppData\\LocalLow\\pixiv\\VRoidStudio\\hair_presets"
}
```

設定出来たら、 [ファイル] - [Windows PowerShellを開く] から PowerShell を開き、以下のコマンドを実行してください。

```bash
node index.js
```

## ライセンス

MITライセンスとします。
利用している各OSSのライセンス表記はソースコード中に含まれます。

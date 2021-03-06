# VRoidのヘアープリセットを管理するやつ

## 利用方法

[Node.js](https://nodejs.org/ja/) のインストールが必要です。

[ここ](https://github.com/yokra9/vroid-hair-rename/releases/download/v0.1.0/v0.1.0.zip)からダウンロードしたZipファイルを解凍し、初期設定を行います。
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

Google Chrome もしくは Microsoft Edge で [http://localhost:3000/edit.html](http://localhost:3000/edit.html) にアクセスすると、プリセットの一覧が表示されます。名前を変更したいプリセットを探し、更新してください。

![操作](./play.gif)

## ライセンス

MITライセンスとします。
利用している各OSSのライセンス表記はソースコード中に含まれます。

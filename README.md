# 不動産管理アプリ

React + Vite + Supabase で作成した、認証付きの不動産管理Webアプリ。

## 機能

- メールアドレス＋パスワードでの会員登録・ログイン（Supabase Auth）
- ログイン後は物件一覧画面（ダミーデータ）へ遷移
- 未ログインの場合はログイン画面へリダイレクト
- ログアウト機能

## セットアップ

```sh
npm install
cp .env.example .env
# .env に SupabaseのProject URLとPublishable keyを設定する
npm run dev
```

`.env` はGit管理対象外です。値は各自のSupabaseプロジェクトの設定画面から取得してください。

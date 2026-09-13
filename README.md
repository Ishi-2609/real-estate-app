# 不動産管理アプリ

React + Vite + Supabase で作成した、認証付きの不動産管理Webアプリ。

## 機能

- メールアドレス＋パスワードでの会員登録・ログイン（Supabase Auth）
- ログイン後は物件一覧画面へ遷移
- 未ログインの場合はログイン画面へリダイレクト
- ログアウト機能
- 物件の一覧表示・新規登録・編集・削除（CRUD）。自分が登録した物件のみ操作可能（RLS）

## セットアップ

```sh
npm install
cp .env.example .env
# .env に SupabaseのProject URLとPublishable keyを設定する
npm run dev
```

`.env` はGit管理対象外です。値は各自のSupabaseプロジェクトの設定画面から取得してください。

## Supabaseのテーブル作成

初回のみ、Supabaseダッシュボードの「SQL Editor」で [supabase/schema.sql](supabase/schema.sql) の内容を実行し、`properties` テーブルとRLSポリシーを作成してください。

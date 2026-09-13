# CLAUDE.md

このファイルは、Claude Code がこのリポジトリで作業する際に従うべきガイドラインを記載したものです。

## プロジェクト概要

不動産管理Webアプリ。Supabase Authによる会員登録・ログイン機能を持ち、ログイン後に物件一覧（ダミーデータ）を表示する。

- メールアドレス＋パスワードで会員登録・ログイン
- 未ログインの場合はログイン画面へリダイレクト
- ログイン後は物件一覧画面へ遷移
- ログアウト機能あり

## 技術スタック

- **フレームワーク**: React 19（関数コンポーネント + Hooks のみ）
- **ビルドツール**: Vite
- **ルーティング**: react-router-dom
- **認証・バックエンド**: Supabase（`@supabase/supabase-js`）。認証状態は `src/contexts/AuthContext.jsx` の Context で管理する
- **Lint**: oxlint（`npm run lint`）
- **スタイリング**: 素の CSS（`App.css` / `index.css`）
- **環境変数**: SupabaseのProject URLとPublishable keyは `.env`（`VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY`）で管理し、`.gitignore` でGit管理対象外にする。設定例は `.env.example` を参照する。**`.env` の値をコミットしたり、チャットやログに直接貼り付けたりしない。**

## ディレクトリ構成 / 命名規約

- `src/pages/` : 画面単位のコンポーネント（`LoginPage.jsx`, `SignupPage.jsx`, `PropertiesPage.jsx`）
- `src/components/` : 複数画面で使う部品（`ProtectedRoute.jsx` など）
- `src/contexts/` : React Context（`AuthContext.jsx`）
- `src/lib/` : 外部サービス連携（`supabaseClient.js`）
- コンポーネントのファイル名・関数名は **PascalCase**、拡張子は `.jsx`、1ファイル1コンポーネント
- CSSクラス名は **kebab-case**
- コメントは日本語で記載する

## Git運用ルール

- **コードを変更したら、その都度 GitHub にプッシュすること。** 変更を作業ツリーに残したまま次の作業に進まない。
- 変更内容ごとに意味のある単位でコミットを作成する（機能追加・修正・リファクタなどをまとめすぎない）。
- コミットメッセージは変更の「why（目的）」が分かるように書く。
- コミット後、`git push` を実行してリモート（GitHub）に反映する。まだリモートやブランチの追跡設定がない場合は `git push -u origin <branch>` で設定する。
- push前に `git status` で意図しないファイル（`.env` などの秘匿情報、大きなバイナリ）が含まれていないか必ず確認する。
- force push（`--force` 等）や履行済みコミットの書き換えは、明示的な指示がない限り行わない。
- 作業前に `git pull` 等でリモートの最新状態を取り込み、コンフリクトが起きた場合は解消してからコミット・プッシュする。

## 開発時の心構え

- 既存のコードスタイル・命名規則に合わせる。
- タスクに必要な範囲を超えたリファクタや機能追加は行わない。
- 変更を加えたら、可能な範囲でビルド・lint・動作確認を実行する。
- Supabaseの認証（サインアップ・ログイン）は実際のプロジェクトにデータを作成する操作のため、動作確認で不用意に実行しない（テスト用アカウントの作成が必要な場合は事前に確認する）。

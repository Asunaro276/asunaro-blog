import { ComponentStory, ComponentMeta } from '@storybook/react'
import PostsList from '.';


export default {
  title: 'HomePage/PostList',
  component: PostsList,
} as ComponentMeta<typeof PostsList>;

const Template: ComponentStory<typeof PostsList> = (args) => <PostsList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  "blogs": [
      {
          "id": "zs58gayf_8vp",
          "publishedAt": "2022-10-20T12:22:57.453Z",
          "title": "Next.js+MUIでページネーションを実装｜ブログづくり",
          "body": [
              {
                  "fieldId": "paragraph",
                  "paragraph": "<p>MUIは非常に便利なライブラリでかっこいいコンポーネントが一通り揃っていますしドキュメントも充実しています。<br>さすが天下のGoogleさんです。<br><br>ただ、使ってみると思うのですがMUIのコンポーネント自体は非常に豊富な機能を有している一方、ドキュメントに関しては案外痒いところに手が届かない説明になっていたりします。<br>今回は自分と同じ痒さを患っている方の手助けをするためにも、Next.jsのLinkコンポーネントとMUIのPaginationコンポーネントを使った簡単なページネーションの実装方法を書き残します。<br>実際の動きを見たい方はこのブログのホームを見てみてください。<br><br>また、今回の実装の内容は私のgithubにおいてあるので、全貌を知りたい方は参照してみてください。</p>"
              },
              {
                  "fieldId": "link",
                  "url": "https://github.com/Asunaro276/pagination-sample",
                  "title": " Asunaro276 / pagination-sample ",
                  "image": {
                      "url": "https://images.microcms-assets.io/assets/956df1a3748845c2b6a401bc730a8295/fe8d0ac2191c4ed1af87d515520e9099/GitHub-Logo.webp",
                      "height": 338,
                      "width": 600
                  }
              },
              {
                  "fieldId": "paragraph",
                  "paragraph": "<h1 id=\"hed900658dc\">環境</h1><ul><li>OS: Ubuntu 20.04.3 LTS</li><li>Node: 16.13.1</li><li>next: 12.1.5</li><li>@mui/material: 5.6.2</li></ul>"
              },
              {
                  "fieldId": "paragraph",
                  "paragraph": "<h1 id=\"h31fc5cbc4a\">事前準備</h1><h2 id=\"hdbde694c04\">Next.jsアプリの作成</h2><p>まずターミナルから適当な空ディレクトリを作り、そこに入ります。</p><pre><code>mkdir pagination-sample\ncd pagination-sample</code></pre><p><br>次に、Next.jsアプリを作るために次のコマンドをターミナルで実行します。</p><pre><code>yarn create next-app .</code></pre><p>create next-appの引数はアプリ名を指すので.をつけることで当該ディレクトリに諸々のファイルを展開できます。<br><br>試しに次のコマンドを実行すれば下の画像のような画面をブラウザに表示することができます。</p><pre><code>yarn dev</code></pre><p><br><img src=\"https://images.microcms-assets.io/assets/956df1a3748845c2b6a401bc730a8295/e75e7db8376a448f836a174ed7c4f7d8/create-next.webp\" alt=\"\"><br><br></p><h2 id=\"h812634645f\">MUIのインストール</h2><p>MUIのインストールは公式に従って次のコマンドを実行します。</p><pre><code>yarn add @mui/material @emotion/react @emotion/styled</code></pre>"
              },
              {
                  "fieldId": "paragraph",
                  "paragraph": "<h1 id=\"h922edff87b\">実装</h1><h2 id=\"h323b331e85\">基本的なページネーションの実装</h2><p>pagesと同じディレクトリにcomponents/Pagination.jsxを作ります。</p><pre><code>mkdir components\ntouch Pagination.jsx</code></pre><p><br>Paginationは次のように実装ができます。</p>"
              },
              {
                  "fieldId": "code",
                  "code": "<pre><code>import { Link as MuiLink, Pagination as MuiPagination, PaginationItem } from '@mui/material'\n\nconst Pagination = ({ pageNumber, totalCount }) =&gt; {\n&nbsp; return (\n&nbsp;&nbsp;&nbsp; &lt;MuiPagination\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; page={pageNumber}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; count={totalCount}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; renderItem={item =&gt; (\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;PaginationItem\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; component={MuiLink}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; href={item.page === 1 ? `/` : `/${item.page}`}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {...item}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; /&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )}\n&nbsp;&nbsp;&nbsp; /&gt;\n&nbsp; )\n}\n\nexport default Pagination</code></pre>",
                  "fileName": "Pagination.tsx"
              },
              {
                  "fieldId": "paragraph",
                  "paragraph": "<p>引数のpageNumberは現在のページ数、totalCountは最後のページのページ番号を表しています。<br>注意としては、PaginationItemのpageは1から始まるので1ページめをホームにしたい場合は上のような書き方をします。<br>これを実際に動かすと次のようになります。<br><br><img src=\"https://images.microcms-assets.io/assets/956df1a3748845c2b6a401bc730a8295/07218a3d5a934a7e93f3d43cfe963c55/%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%8D%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3.gif\" alt=\"\"></p>"
              },
              {
                  "fieldId": "paragraph",
                  "paragraph": "<h2 id=\"hcca370e7eb\">next/linkと組み合わせる</h2><p>次にNext.jsのルーティング用コンポーネントのnext/linkと組み合わせてみます。<br>といっても、そんなに難しい話ではなく、ただPaginationItemをnext/linkでラップすればよいだけです。</p>"
              },
              {
                  "fieldId": "code",
                  "code": "<pre><code>import { Link as MuiLink, Pagination as MuiPagination, PaginationItem } from '@mui/material'\nimport Link from 'next/link'\n\nconst Pagination = ({ pageNumber, totalCount }) =&gt; {\n&nbsp; return (\n&nbsp;&nbsp;&nbsp; &lt;MuiPagination\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; page={pageNumber}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; count={totalCount}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; renderItem={item =&gt; (\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;Link href={item.page === 1 ? `/` : `/${item.page}`} passHref&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;PaginationItem\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {...item}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; component={MuiLink}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; /&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/Link&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )}\n&nbsp;&nbsp;&nbsp; /&gt;\n&nbsp; )\n}\n\nexport default Pagination</code></pre>",
                  "fileName": "Pagination.jsx"
              },
              {
                  "fieldId": "paragraph",
                  "paragraph": "<p>注意としてはLinkコンポーネントにpassHrefを入れています。<br>これはラップされているaタグ（MuiLinkコンポーネント）にhref属性を渡すためです。<br>というのも、aタグがhref属性を持っていないのはSEO的に不利らしいので、多くの場合next/linkでaタグをラップする場合にはpassHrefをTrueにします。<br><br>このときのPaginationの動きは次のようになります。<br><br><img src=\"https://images.microcms-assets.io/assets/956df1a3748845c2b6a401bc730a8295/b974be674cfd4823838dc71085eccca9/%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%8D%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%8D%E3%82%AF%E3%82%B9%E3%83%88.gif\" alt=\"\"></p>"
              },
              {
                  "fieldId": "paragraph",
                  "paragraph": "<h1 id=\"ha214098e44\">まとめ</h1><p>今回はMUIのPaginationコンポーネントとNextのLinkコンポーネントを使って簡単なページネーション機能を実装しました。<br>MUIを使うとおしゃれなUIが簡単に作れるので本当に便利ですね。<br>これからもおせわになりそうです。<br><br>なお、今回の実装はMUIの公式ドキュメントを参考にしています。<br>気になる方は参照してみてください。</p>"
              },
              {
                  "fieldId": "link",
                  "url": "https://mui.com/material-ui/react-pagination/#router-integration",
                  "title": "React Pagination component - Material UI",
                  "linkTo": "MUI",
                  "image": {
                      "url": "https://images.microcms-assets.io/assets/956df1a3748845c2b6a401bc730a8295/82fad3dca8014cdd8a4071e291a13b79/MUI.png",
                      "height": 630,
                      "width": 1200
                  }
              }
          ],
          "category": {
              "id": "2d5ubbj-eu",
              "displayedName": "プログラミング",
              "name": "programming"
          },
          "tags": [
              {
                  "id": "r_lkkwrxg5m",
                  "tag": "TypeScript"
              },
              {
                  "id": "wdo68jz976",
                  "tag": "MUI"
              },
              {
                  "id": "x5tefqb60c1",
                  "tag": "Next.js"
              },
              {
                  "id": "qjlm24elza",
                  "tag": "ブログ"
              }
          ],
          "image": {
              "url": "https://images.microcms-assets.io/assets/956df1a3748845c2b6a401bc730a8295/82fad3dca8014cdd8a4071e291a13b79/MUI.png",
              "height": 630,
              "width": 1200
          },
          "description": "MUIは非常に便利なライブラリでかっこいいコンポーネントが一通り揃っていますしドキュメントも充実しています。ただ、使ってみると思うのですがMUIのコンポーネント自体は非常に豊富な機能を有している一方、ドキュメントに関しては案外痒いところに手が届かない説明になっていたりします。今回は自分と同じ痒さを患っている方の手助けをするためにも、Next.jsのLinkコンポーネントとMUIのPaginationコンポーネントを使った簡単なページネーションの実装方法を書き残します。"
      },
      {
          "id": "oha60sv8zra7",
          "publishedAt": "2022-10-19T06:13:44.002Z",
          "title": "Next.js+microCMSで作るJamstackな技術ブログ｜自作ブログ",
          "body": [
              {
                  "fieldId": "paragraph",
                  "paragraph": "<p>いままでエンジニアらしくこのブログの機能をいろいろと自作してきたわけですが、ここ最近ようやっとまともに見れる程度のできになってきたのでここらで全体の構成を記事にしようかと思い立ちました。<br>なにぶん初めてのシステムづくりなので汚い部分もあるとは思いますが温かい目で見守って上げてください。<br>↓はこのブログのソースコードです。随時更新中です。</p>"
              },
              {
                  "fieldId": "link",
                  "url": "https://github.com/Asunaro276/asunaro-blog",
                  "title": "Asunaro276 / asunaro-blog",
                  "linkTo": "github",
                  "image": {
                      "url": "https://images.microcms-assets.io/assets/956df1a3748845c2b6a401bc730a8295/78910695737042b8a3be401e2a051a5b/blog-readme.webp",
                      "height": 172,
                      "width": 400
                  }
              },
              {
                  "fieldId": "paragraph",
                  "paragraph": "<h1 id=\"h1921e50ba5\">全体構成</h1><h2 id=\"h03726fb0df\">技術スタック</h2><h3 id=\"hbc08ded6c8\">TypeScript</h3><p>最近はWEBフロントエンドを作ろうと思うとまずTypeScriptみたいですね。<br>私はJavaScriptをほとんど触ったことがないので、みなさんがおっしゃるTypeScriptならではのうざさにあまり共感できないでいるわけですがこれは幸せなのか不幸なのか。<br><br></p><h3 id=\"haab1fd6475\">Next.js</h3><p>普通にreactでも良いのですが、Nextは痒いところに手が届きます。<br>特に頼りになったと思う機能は以下です。</p><ul><li>動的ルーティングを勝手に作ってくれる</li><li>画像を勝手に最適化してくれる</li><li>SSG</li></ul><p>特に最後のSSGはJamstack構成には必須ですし、画像の最適化はパフォーマンスチューニングには欠かせませんでした。<br>こういう静的なブログを作る場合にはGatsbyなどのフレームワークの方が向いているという意見も見受けられたので、一度Gatsbyのブログテンプレートを見てみたのですが開発経験の浅さも相まって初見では意味ぷー過ぎたので、よりわかりやすいNext.jsに飛びつきました。<br><br></p><h3 id=\"he3ae70a191\">MUI</h3><p>コンポーネントが最初から用意されているのでほんとに楽です。<br>特に、ちょっとした機能なのにスクラッチからだと案外めんどくさい機能（ボタンの波紋とかページネーションとか）を最初から用意してくれているのが最高です。<br>sxでスタイルも気軽にいじれますしね。<br><br></p><h3 id=\"h5572fb6d00\">Tailwind CSS</h3><p>本当はMUIだけでそれなりのウェブサイトは作れるのですが、今回はサーバーサイドで静的レンダリングをする際に生のHTMLを扱う必要があったので、そのスタイリングにはTailwind CSSを使いました。<br>ただ、MUIとTailwind CSSは両方とも強力な分、いろいろと競合が起きることも多いので併用には注意が必要です。<br><br></p><h2 id=\"h2cbf9a1f7c\">CMS</h2><h3 id=\"hae6947d5ce\">microCMS</h3><p>みんな大好きmicroCMSです。比較的新しいサービスということもあり、記事が充実していないかと思いきや、公式の発信する情報やドキュメントが神がかっているのでかなりおすすめです。<br>機能についても記事公開に合わせた自動デプロイ機能やカスタムフィールドなどシンプルながらも組み合わせ次第でいくらでも強力にできそうなものを備えています。<br><br></p><h2 id=\"h71cecd95f4\">ホスティングサービス</h2><h3 id=\"hc682c23596\">Cloudflare Pages</h3><p>比較的新しいサービスらしいですが、他のサービスに比べて無料枠でできることがかなり幅広いです。<br><br>例として、アクセス制限やアクセス解析、セキュリティ機能、速度分析などを無料で提供してくれています。<br>また、もともとがCDNの企業ということもあり配信パフォーマンスも高いです。<br><br></p><h3 id=\"h9da03a681c\">Netlify</h3><p>実は最初はNetlifyにデプロイしておりCloudflareにはあとから移管しました。<br>Netlifyもビルドキャッシュによるビルドの高速化やプレビュー機能など十分に強力な機能を無料で提供してくれていたのですが、無料枠だと使えるCDNが限定されているらしく、パフォーマンスの点でどうしても満足がいきませんでした。<br><br>まあ、うちみたいな零細弱小ブログがなにイキってパフォーマンスチューニングとか語ってんだと言われれば反論の余地もないわけですが、勉強も兼ねたブログづくりなのでやはり突き詰められる部分は突き詰めていきたいという思いがありまして、移管を決断しました。<br>いままでありがとう、グッバイNetlify。</p>"
              },
              {
                  "fieldId": "paragraph",
                  "paragraph": "<h1 id=\"hc31ba47243\">今までに作った機能</h1><h2 id=\"h75733fad5c\">数式表示</h2><p>KaTeXを使って作りました。<br>インラインにも数式を貼れますし（$\\mathrm{e}^{\\mathrm{i}\\theta} = \\cos(\\theta) + \\mathrm{i}\\sin(\\theta)$）、次のようにディスプレイ型の数式も使えます。<br><br>$$<br>\\cos(\\theta) = \\frac{\\mathrm{e}^{\\mathrm{i}\\theta} + \\mathrm{e}^{-\\mathrm{i}\\theta}}{2},\\\\ \\sin(\\theta) = \\frac{\\mathrm{e}^{\\mathrm{i}\\theta} - \\mathrm{e}^{-\\mathrm{i}\\theta}}{2\\mathrm{i}}<br>$$<br><br>数式表示については以下の記事で詳しい解説をしているので気になる方は参照どうぞ。</p>"
              },
              {
                  "fieldId": "link",
                  "url": "https://asunaroblog.net/blog/ug5ih1l-9",
                  "title": "Next.js+microCMS+KaTeXで数式をサーバーサイドレンダリングする｜ブログづくり",
                  "image": {
                      "url": "https://images.microcms-assets.io/assets/956df1a3748845c2b6a401bc730a8295/557845d2e5c54da58bac64ae82ab06ab/katex.webp",
                      "height": 263,
                      "width": 500
                  }
              },
              {
                  "fieldId": "paragraph",
                  "paragraph": "<h2 id=\"h40a620a275\">ソースコードのハイライト</h2><p>サーバーサイドでのハイライトに関してはmicroCMSブログに素晴らしい解説記事が載っているのでそちらを参照するのがよろしいかと思います。<br>一応以下のような形でファイル名を含めてハイライトができるようにしています。</p>"
              },
              {
                  "fieldId": "code",
                  "code": "<pre><code>def main():\n    print(\"Hello World\")\n\nmain()</code></pre>",
                  "fileName": "main.py"
              },
              {
                  "fieldId": "link",
                  "url": "https://blog.microcms.io/syntax-highlighting-on-server-side/",
                  "title": "サーバサイドでシンタックスハイライトを行う",
                  "image": {
                      "url": "https://images.microcms-assets.io/assets/956df1a3748845c2b6a401bc730a8295/d17c6040ab5b44c38ad7314213d99768/syntax-highlighting-on-server-side-ogp.webp",
                      "height": 420,
                      "width": 800
                  }
              },
              {
                  "fieldId": "paragraph",
                  "paragraph": "<h2 id=\"he4ac272820\">サイドバー・記事のタグ一覧</h2><p>サイドバーと記事のタグ一覧ですね。<br>microCMSブログやその他の技術ブログを参考に作りました。<br>個別記事のサイドバーでは目次が一番大事だと思ったので、タグに関しては記事数上位10個のタグのみを表示するようにしています。<br>個別記事以外のページでは全タグを表示しています。<br><br></p><h2 id=\"h02705e3cfa\">レスポンシブデザイン</h2><p>これは常に意識している部分ですね。<br>まあ技術ブログなのでスマホから見られることってあんまりないと思うのですが、やっておいたほうが丁寧ですよね、普通に。<br><br>あとは友達に「ブログ作ってるんやで～」って自慢する際にだいたいLINEで送りますよね。<br>てことはその友達はスマホから見るわけで、そのときにレイアウトがちゃがちゃだとかっこ悪すぎるので、レスポンシブに関しては今後も力を入れていくと思います。<br>ただ、Tailwind CSSとMUIってレスポンシブのブレークポイントが若干違うので、併用の弊害がここでも出ます。<br>まあ、普通にブレークポイント合わせる設定をすればいいんですが、めんどくさくて...<br><br></p><h2 id=\"h9ca29e2820\">タグ・カテゴリごとの記事一覧</h2><p>これはページネーションと合わせて結構大変な作業になりました。<br>特にNext.jsのgetStaticPathsでパスを作成する部分がめんどくさかったです。<br><br>でも皆さんめんどくさいゲームとか好きですよね（スプラとかマイクラとか）。<br>めんどくさいことってめんどくさいけど楽しかったりするんですよね。<br><br></p><h2 id=\"h43a144f4e4\">ページネーション</h2><p>これは以前一度作ったのですが壊れていたので改めて作り直したりしました。<br>タグやカテゴリごとの記事一覧でもページネーションを行ったので結構たいへんでした。<br><br></p><h2 id=\"hd72385f754\">関連リンクカード</h2><p>関連リンクカードは最初html-react-parserを使っていたのでMUIで楽に作れていたのですが、途中からパースをcheerioにしたのでTailwind CSSで作る必要があり、結構たいへんでした。<br>今はシンプルすぎるので今後もう少しかっこいいリンクカードを作れたらいいなと思っています。<br><br></p><h2 id=\"h672ac346e2\">サーバーサイドでHTMLをパース</h2><p>最初html-react-parserを使っていたのですが、MUIを使える分フロントエンドでパースされてパフォーマンスが落ちそうだったのでサーバーサイドでパースが行えるcheerioを使うことにしました。<br>生のHTMLを扱わなければならないので、ソースコードのハイライトや数式をきれいにする処理の実装はめんどくさかったです。<br><br></p><h2 id=\"h0669eefa7c\">目次</h2><p>これは絶対にほしいと思ったのでまっさきに作りました。<br>正直個人的にブログを見ているときも目次がないとプチ切れるレベルで目次中毒です。<br>本を読む際にも、図書館や書店で本を買う・借りる際にも目次しっかり見るタイプの人間なので目次がないのは論外でした。<br><br>このブログの目次は見出しから自動生成するタイプのものですが、どこまで細かく目次に含めるかは結構悩みました。<br>サイドバーに関しても現状では大見出しのみ目次として表示しているのですが小見出しも畳んでおいて、開けば見れるようにするというのもありかなとおもっています。</p>"
              },
              {
                  "fieldId": "paragraph",
                  "paragraph": "<h1 id=\"h4e0c8b9aa8\">今後実装するかもな機能</h1><h2 id=\"h63ad3943f9\">テスト</h2><p>これはさっさとやりたいです。<br>storybookも導入はしているもののあまり有効活用できていないという状況があるので、うまい付き合い方を模索しながら自分なりの使い方をしていきたいですね。<br><br></p><h2 id=\"hf2d2c1db38\">ダークモード対応</h2><p>こちらはやり方はわかっているのですがいざやろうとすると色決めたりパレットの設定をしたりちょっと面倒だったりします。<br>ただ、寝る前に電気消してスマホいじってるときとかにダークモードがないサイトとか開くと目が痛くて辛いときがたまにあるので、このブログの読者にはそういった不便をおかけしないようなるだけはやく取り組みたいとは思っています。<br><br></p><h2 id=\"h73c672722b\">こちらの記事もおすすめ</h2><p>これはすぐにでも作れる機能です。<br>自分がブログ記事見るときには正直あまり必要だと思わない機能なのですが、記事を一番下まで読んだときにいきなりフッターが来るとちょっと寂しい感じがあるのでできればつけたいです。<br>まあ、フッターと記事の間にごちゃごちゃ色々あるのも汚らしくて嫌という意見もありますが。<br></p><h2 id=\"hdffe79e067\">関連記事カード</h2><p>アマゾンなどへの誘導リンクカードはあるのですが、このブログ内の他記事への誘導カードはもう少しリッチなものを簡単に作れそうなので作ろうかと思っています。<br></p><h2 id=\"h4fd117f351\">月ごとアーカイブ</h2><p>これも別にどちらでも良いと思うのですが、記事の投稿頻度を自分に戒めるためにも必要なのかしら。<br>まあ、サイドバーがごちゃごちゃしてるのも個人的には嫌いなのですが、汚らしくて。<br></p><h2 id=\"h9c0890b854\">問い合わせ機能</h2><p>これはいつか欲しいですね。<br>まあ、こんな零細弱小貧弱ブログにいらっしゃる物好きな方がまず少ない中で、私に問い合わせしてくださる方がいるとは思いませんが、いつかお仕事の依頼とか（妄想）受けるのに役立ってくれたらいいなあ。<br><br>といっても、この機能自体はmicroCMSのポストメソッドを使って実装するのでAPIやフォーム作りの勉強もできるのでモチベーション自体は割りとあったりします。<br></p><h2 id=\"h7046832a15\">SNSなどとの連携</h2><p>これ、必要でしょうか？<br>そもそも私はSNSを何一つやっていないのでこの機能があってもあまり利用しなさそうという気がしています。<br>とはいえ、RSSなんかはあってもいいのかなと思いつつ。<br>あとは将来Twitterなんかを始めたら実装するかもですね。<br></p><h2 id=\"h04fb6a787d\">SEO対策</h2><p>いい加減SEO対策についてはしっかりやったほうがいいということはわかっています。<br>ですが、めんどくさいですよね正直。<br><br>モチベーションが上がってきたらやります。</p>"
              },
              {
                  "fieldId": "paragraph",
                  "paragraph": "<h1 id=\"ha214098e44\">まとめ</h1><p>今回はこのブログの構成や実装した機能について改めて説明してみました。<br>今後ブログを作ろうという方の一助になることを願っています。<br><br>「ブログで会社員の10倍稼ごう！」みたいな話がたびたび持ち上がるわけですが、エンジニアなら金がどうとかではなく単にブログを作ることそのものを楽しんだらいいと思います。<br>特にJamstackならAPIの勉強にもなりますし、新米エンジニアが初めて作るシステムとしてはうってつけだと思います。<br><br>だからといって金がいらないというわけではないですよ？<br>いつかこのブログが金のなる木になってくれることを密かに期待しつつ、今後も楽しみながらブログづくりに励んでいく所存です。</p>"
              }
          ],
          "category": {
              "id": "2d5ubbj-eu",
              "displayedName": "プログラミング",
              "name": "programming"
          },
          "tags": [
              {
                  "id": "qjlm24elza",
                  "tag": "ブログ"
              },
              {
                  "id": "r_lkkwrxg5m",
                  "tag": "TypeScript"
              },
              {
                  "id": "wdo68jz976",
                  "tag": "MUI"
              },
              {
                  "id": "5hjdw0w-u",
                  "tag": "Tailwind CSS"
              },
              {
                  "id": "x5tefqb60c1",
                  "tag": "Next.js"
              },
              {
                  "id": "h65ae0o5-w",
                  "tag": "React"
              }
          ],
          "image": {
              "url": "https://images.microcms-assets.io/assets/956df1a3748845c2b6a401bc730a8295/23c4fb996c3e45fa9c96359c9f67ff87/blog.webp",
              "height": 332,
              "width": 500
          },
          "description": "いままでエンジニアらしくこのブログの機能をいろいろと自作してきたわけですが、ここ最近ようやっとまともに見れる程度のできになってきたのでここらで全体の構成を記事にしようかと思い立ちました。なにぶん初めてのシステムづくりなので汚い部分もあるとは思いますが温かい目で見守って上げてください。"
      }
  ],
}
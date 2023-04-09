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
      "_id": "641d6a25b5b671fd6670e71b",
      "_sys": {
        "raw": {
          "createdAt": "2023-03-24T09:15:17.270Z",
          "updatedAt": "2023-03-29T06:10:22.201Z",
          "firstPublishedAt": "2023-03-24T09:46:40.300Z",
          "publishedAt": "2023-03-29T06:10:22.201Z"
        },
        "customOrder": 2,
        "createdAt": "2023-03-24T09:46:40.300Z",
        "updatedAt": "2023-03-29T06:10:22.201Z"
      },
      "title": "アブダクションとは｜意味から具体的な例題まで解説",
      "description": "<p>論理的推論の方法の一つであるアブダクションとはどのようなものでしょうか？この記事ではアブダクションを含めた論理的推論の手法について具体例をもとに解説しています。</p>",
      "coverImage": {
        "_id": "641d65d5b5b671fd666c5556",
        "altText": "",
        "description": "",
        "fileName": "teamwork-3213924_1920.webp",
        "fileSize": 59184,
        "fileType": "image/webp",
        "height": 504,
        "metadata": {},
        "src": "https://storage.googleapis.com/p_641d41d3a492e5ac4c9226fe/40bcc0e0-1cab-4288-89f7-036af54eaaf8%2Fteamwork-3213924_1920.webp",
        "title": "",
        "width": 800
      },
      "category": {
        "_id": "641d5f2a0293b870f66ae525",
        "_sys": {
          "raw": {
            "createdAt": "2023-03-24T08:28:26.263Z",
            "updatedAt": "2023-03-29T06:28:11.575Z",
            "firstPublishedAt": "2023-03-24T08:28:26.263Z",
            "publishedAt": "2023-03-24T08:28:45.982Z"
          },
          "customOrder": 3,
          "createdAt": "2023-03-24T08:28:26.263Z",
          "updatedAt": "2023-03-24T08:28:45.982Z"
        },
        "displayedName": "ビジネス",
        "name": "business"
      },
      "tags": [
        {
          "_id": "641d606a0293b870f66cf22e",
          "_sys": {
            "raw": {
              "createdAt": "2023-03-24T08:33:46.817Z",
              "updatedAt": "2023-03-29T06:19:05.465Z",
              "firstPublishedAt": "2023-03-24T08:33:46.818Z",
              "publishedAt": "2023-03-29T06:19:05.465Z"
            },
            "customOrder": 12,
            "createdAt": "2023-03-24T08:33:46.818Z",
            "updatedAt": "2023-03-29T06:19:05.465Z"
          },
          "tag": "ロジカルシンキング"
        }
      ],
      "body": "<p>先日、来年度から入社予定の会社から論理的推論に関する以下の課題図書が送られてきました。</p>\n<p><a href=\"https://amzn.to/3Sg5hlT\">linkCard</a></p>\n<p>この本の内容で、演繹法と帰納法については以前からなんとなく知っていたのですが、アブダクションについては知らなかったので、調べた結果を書き残します。</p>\n<h1>論理的推論</h1>\n<h2>論理的推論とは</h2>\n<p>ウィキペディアによると</p>\n<blockquote>\n<p>推論（すいろん、英語: inference）とは、既知の事柄を元にして未知の事柄について予想し、論じる事である。</p>\n</blockquote>\n<p>だそうです。さらに、論理的推論といった場合には論理学における推論のことを指しており、これは</p>\n<ul>\n<li>演繹法</li>\n<li>帰納法</li>\n<li>アブダクション</li>\n</ul>\n<p>の三つに大別されるそうです。</p>\n<h2>問題設定</h2>\n<p>この記事では簡単に以下のような問題設定を使って各推論方法についての説明を試みます。</p>\n<pre><code>前提条件：夏が暑い\n規則：夏が暑いとアイスクリームがよく売れる\n結果：アイスクリームがよく売れる\n</code></pre>\n<p>論理的推論が使えるのはこの3つのうちの<strong>2つが既知で1つが未知</strong>の場合です。そのような状況で残り1つの未知の事柄を予想するのが論理的推論です。</p>\n<h1>演繹法</h1>\n<h2>演繹法とは</h2>\n<p>まず最初に説明するのが演繹法です。演繹法は結果が未知の場合の推論方法で、上の例題では次のようになります。</p>\n<ul>\n<li>前提条件：今年の夏は暑い</li>\n<li>規則：夏が暑いとアイスクリームがよく売れる</li>\n<li>結果（予想）：今年の夏はアイスクリームがよく売れるだろう</li>\n</ul>\n<p>ここで注意すべきなのは、推論は<strong>あくまで予想</strong>なのでこれが本当に当たっているのかどうかには、検証作業が別途必要であるということです。</p>\n<h2>使い道</h2>\n<p>演繹法は一般に数学者の頭の使い方であるといわれることがあります。例えば方程式を解く場合、与式（前提条件）を変形規則（規則）に従って変形し、結論（結果）を導きます。</p>\n<p>一方、ビジネスにおいては検証と未来予想に使われることが多いようです。例えば、次に説明する帰納法から得た規則を検証したり、企画立案のための方針にいかしたりということですね。</p>\n<h1>帰納法</h1>\n<h2>帰納法とは</h2>\n<p>2つ目に説明するのが帰納法です。帰納法は規則が未知の場合の推論方法で、上の例題では次のようになります。</p>\n<pre><code>前提条件1：2年前の夏は暑かった\n結果1：2年前の夏はアイスクリームがよく売れた\n前提条件1：去年の夏は暑かった\n結果1：去年の夏はアイスクリームがよく売れた\n規則（予想）：夏が暑いとアイスクリームがよく売れるだろう\n</code></pre>\n<p>ここで注意すべきは、前提条件と結果の組み合わせが複数なければ帰納法の信ぴょう性は下がってしまうということです。また、演繹法と同じくあくまで予想なので、推論の正しさについては別途検証が必要です。</p>\n<h2>使い道</h2>\n<p>帰納法は一般に科学者（物理学者など）の頭の使い方であるといわれることがあります。例えばニュートンは木にぶら下がったりんご（前提条件）が落ちた（結果）ことから物質は引き合う（規則）という結論を出しました。</p>\n<p>ビジネスにおいてもこのような事象と事象をつなぐ規則を知っておくことで戦略立案などに役立つそうです。（よくわからぬ）</p>\n<h1>アブダクション</h1>\n<h2>アブダクションとは</h2>\n<p>最後にに説明するのが本記事のメインディッシュであるアブダクションです。アブダクションは前提条件が未知の場合の推論方法で、上の例題では次のようになります。</p>\n<ul>\n<li>結果：20年前の夏はアイスクリームがよく売れた</li>\n<li>規則：夏が暑いとアイスクリームがよく売れる</li>\n<li>前提条件（予想）：20年前の夏は暑かった</li>\n</ul>\n<h2>よくある間違い</h2>\n<p>アブダクションは帰納法と混同することが多いようです（実際私の読んだ書籍でもこの二つをごっちゃにしている節が見受けられました）。以下によくある間違いを紹介します。</p>\n<ul>\n<li>結果：20年前の夏はアイスクリームがよく売れた</li>\n<li>前提条件（仮説）：20年前の夏は暑かったのではないか</li>\n<li>規則（結論）：夏が暑いとアイスクリームがよく売れる</li>\n</ul>\n<p>この例と一つ上の例の違いは、前提条件のみが未知なのか前提条件と規則の二つが未知となっているのかということです。前提条件と規則の二つが未知の場合には基本的にアブダクションは使用できません。この場合、まずは帰納法を使うのが定石です。すなわち、まず前提条件と結果の組（今回の場合「夏が暑く、かつアイスクリームが売れた」年の組）を複数用意し、ここから帰納法により「夏が暑いとアイスクリームが売れる」という規則を導きます。そこから、あぶだくしょんにより前提条件を導くという流れを取るのが正しい推論になります。</p>\n<h2>使い道</h2>\n<p>アブダクションは歴史学者の頭の使い方であるといわれることがあります。例えば歴史学者は、ある遺物がここにあり（結果）、この遺物は特定の宗教を信仰している人々の遺跡からよく出土する（規則）ため、この地ではその宗教が信仰されていた、というような考え方をします。</p>\n<p>また、ビジネスでも売り上げが伸びた原因、売上が落ちた原因などを調べるためにアブダクションを用います。</p>\n<p>まとめ</p>\n<ul>\n<li>演繹法、帰納法、アブダクションは混同しやすいので前提条件、規則、結果という三つの要素と紐づけて覚えよう</li>\n<li>三つの推論はわざわさ考えるまでもなく直感的にもわかるようなことを言っています。しかし、この三つを意識的にうまく組み合わせていくことで、直感ではわからないような深い洞察を得ることができるようになります（論理的思考ってそういうものですよね）。</li>\n</ul>\n"
    },
    {
        "_id": "641d5d9a0293b870f6668d22",
        "_sys": {
            "raw": {
              "createdAt": "2023-03-24T08:21:46.452Z",
              "updatedAt": "2023-03-29T06:10:42.719Z",
              "firstPublishedAt": "2023-03-24T08:55:18.593Z",
              "publishedAt": "2023-03-29T06:10:42.719Z"
            },
            "customOrder": 1,
            "createdAt": "2023-03-24T08:55:18.593Z",
            "updatedAt": "2023-03-29T06:10:42.719Z"
        },
        "title": "TypescriptでuseSelectorを使ったらエラーが出た",
        "description": "TypescriptでuseSelectorを使った時に出てくるエラーProperty '〇〇' does not exist on type 'DefaultRootState'の対処法を解説しています。",
        "body": "<p>状況</p>\n<p>TypeScript + Next.js + Reduxで以下のようにuseSelectorを使おうとした際，useSelectorの引数でts(2339)が出た。</p>\n<pre><code>const Component = () =&gt; {\n  const current_page = useSelector(state =&gt; state.page.current_page)　// ← この部分\n  switch (current_page) {\n    case 'project':\n      return &lt;HomeProject /&gt;\n    default:\n      return &lt;Dashboard /&gt;\n }\n\n</code></pre>\n<p>解決策</p>\n<p>useSelectorの引数の無名関数における引数（上のコードのstate）の型を指定する</p>\n<ol>\n<li>useSelectorで取り出す状態の型（ここではRootState）を定義</li>\n</ol>\n<pre><code>import { combineReducers } from &quot;redux&quot;;\nimport inputReducer from &quot;./reducers/input&quot;;\nimport pageReducer from &quot;./reducers/page&quot;;\nimport { configureStore } from &quot;@reduxjs/toolkit&quot;;\n\nconst rootReducer = combineReducers({input: inputReducer, page: pageReducer})\n\nexport const store = configureStore({\n  reducer: rootReducer\n})\n\nstore.subscribe(()=&gt; {console.log(store.getState())})\n\nexport type RootState = ReturnType&lt;typeof store.getState&gt;\nexport type RootDispatch = typeof store.dispatch\n</code></pre>\n<p>2.stateの型を指定</p>\n<pre><code>const Component = () =&gt; {\n  const current_page = useSelector((state: RootState) =&gt; state.page.current_page)\n  switch (current_page) {\n    case 'project':\n      return &lt;HomeProject /&gt;\n    default:\n      return &lt;Dashboard /&gt;\n }\n</code></pre>\n<p>↓参考リンク<br>\n<a href=\"https://stackoverflow.com/questions/60777859/ts2339-property-tsreducer-does-not-exist-on-type-defaultrootstate\">linkCard</a></p>\n",
        "coverImage": {
            "_id": "641d5e3c0293b870f66801e3",
            "altText": "",
            "description": "",
            "fileName": "redux.webp",
            "fileSize": 17452,
            "fileType": "image/webp",
            "height": 504,
            "metadata": {},
            "src": "https://storage.googleapis.com/p_641d41d3a492e5ac4c9226fe/5cf627c5-db52-4a9b-b3f4-5b01ba34d1f7%2Fredux.webp",
            "title": "",
            "width": 960
        },
        "category": {
            "_id": "641d5f0d0293b870f66ac18c",
            "_sys": {
              "raw": {
                "createdAt": "2023-03-24T08:27:57.405Z",
                "updatedAt": "2023-03-29T06:28:11.570Z",
                "firstPublishedAt": "2023-03-24T08:27:57.405Z",
                "publishedAt": "2023-03-24T08:27:57.405Z"
              },
              "customOrder": 4,
              "createdAt": "2023-03-24T08:27:57.405Z",
              "updatedAt": "2023-03-24T08:27:57.405Z"
            },
            "displayedName": "プログラミング",
            "name": "programming"
        },
        "tags": [
            {
              "_id": "641d5fb10293b870f66bda20",
              "_sys": {
                "raw": {
                  "createdAt": "2023-03-24T08:30:41.227Z",
                  "updatedAt": "2023-03-29T06:15:13.984Z",
                  "firstPublishedAt": "2023-03-24T08:30:41.228Z",
                  "publishedAt": "2023-03-29T06:15:13.984Z"
                },
                "customOrder": 1,
                "createdAt": "2023-03-24T08:30:41.228Z",
                "updatedAt": "2023-03-29T06:15:13.984Z"
              },
              "tag": "デバッグ備忘録"
            },
            {
              "_id": "641d5fd30293b870f66c1065",
              "_sys": {
                "raw": {
                  "createdAt": "2023-03-24T08:31:15.987Z",
                  "updatedAt": "2023-03-29T06:15:25.888Z",
                  "firstPublishedAt": "2023-03-24T08:31:15.987Z",
                  "publishedAt": "2023-03-29T06:15:25.888Z"
                },
                "customOrder": 2,
                "createdAt": "2023-03-24T08:31:15.987Z",
                "updatedAt": "2023-03-29T06:15:25.888Z"
              },
              "tag": "React"
            },
            {
              "_id": "641d60000293b870f66c5590",
              "_sys": {
                "raw": {
                  "createdAt": "2023-03-24T08:32:00.452Z",
                  "updatedAt": "2023-03-29T06:17:57.597Z",
                  "firstPublishedAt": "2023-03-24T08:32:07.472Z",
                  "publishedAt": "2023-03-29T06:17:57.597Z"
                },
                "customOrder": 4,
                "createdAt": "2023-03-24T08:32:07.472Z",
                "updatedAt": "2023-03-29T06:17:57.597Z"
              },
              "tag": "Redux"
            },
            {
              "_id": "641d603f0293b870f66c9a4e",
              "_sys": {
                "raw": {
                  "createdAt": "2023-03-24T08:33:03.927Z",
                  "updatedAt": "2023-03-29T06:18:29.429Z",
                  "firstPublishedAt": "2023-03-24T08:33:03.927Z",
                  "publishedAt": "2023-03-29T06:18:29.429Z"
                },
                "customOrder": 8,
                "createdAt": "2023-03-24T08:33:03.927Z",
                "updatedAt": "2023-03-29T06:18:29.429Z"
              },
              "tag": "TypeScript"
            },
            {
              "_id": "641d60bb0293b870f66d60c1",
              "_sys": {
                "raw": {
                  "createdAt": "2023-03-24T08:35:07.951Z",
                  "updatedAt": "2023-03-29T06:14:08.498Z",
                  "firstPublishedAt": "2023-03-24T08:35:07.951Z",
                  "publishedAt": "2023-03-24T08:35:07.951Z"
                },
                "customOrder": 20,
                "createdAt": "2023-03-24T08:35:07.951Z",
                "updatedAt": "2023-03-24T08:35:07.951Z"
              },
              "tag": "フロントエンド"
            }
        ],
    }
  ],
}
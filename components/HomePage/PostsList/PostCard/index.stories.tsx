import { ComponentStory, ComponentMeta } from '@storybook/react'

import PostCard from '.'

export default {
  title: 'HomePage/PostList/PostCard',
  component: PostCard,
} as ComponentMeta<typeof PostCard>;

const Template: ComponentStory<typeof PostCard> = (args) => <PostCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  "blog": {
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
}
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
    "id": "l7-ruzsfr",
    "publishedAt": "2022-04-23T09:28:09.736Z",
    "title": "TypescriptでuseSelectorを使ったらエラーが出た",
    "body": [
        {
            "fieldId": "paragraph",
            "paragraph": "<h1 id=\"ha674a2016e\">状況</h1><p>TypeScript + Next.js + Reduxで以下のようにuseSelectorを使おうとした際，useSelectorの引数でts(2339)が出た。</p><pre><code>const Component = () =&gt; {\n  const current_page = useSelector(state =&gt; state.page.current_page)　// ← この部分\n  switch (current_page) {\n    case 'project':\n      return &lt;HomeProject /&gt;\n    default:\n      return &lt;Dashboard /&gt;\n }</code></pre><p><br></p>"
        },
        {
            "fieldId": "paragraph",
            "paragraph": "<h1 id=\"hc4c05c18f9\">解決策</h1><p>useSelectorの引数の無名関数における引数（上のコードのstate）の型を指定する<br>1. useSelectorで取り出す状態の型（ここではRootState）を定義</p><pre><code>import { combineReducers } from \"redux\";\nimport inputReducer from \"./reducers/input\";\nimport pageReducer from \"./reducers/page\";\nimport { configureStore } from \"@reduxjs/toolkit\";\n\nconst rootReducer = combineReducers({input: inputReducer, page: pageReducer})\n\nexport const store = configureStore({\n  reducer: rootReducer\n})\n\nstore.subscribe(()=&gt; {console.log(store.getState())})\n\nexport type RootState = ReturnType&lt;typeof store.getState&gt;\nexport type RootDispatch = typeof store.dispatch</code></pre><p>2.stateの型を指定</p><pre><code>const Component = () =&gt; {\n  const current_page = useSelector((state: RootState) =&gt; state.page.current_page)\n  switch (current_page) {\n    case 'project':\n      return &lt;HomeProject /&gt;\n    default:\n      return &lt;Dashboard /&gt;\n }</code></pre><p>↓参考リンク</p>"
        },
        {
            "fieldId": "link",
            "url": "https://stackoverflow.com/questions/60777859/ts2339-property-tsreducer-does-not-exist-on-type-defaultrootstate",
            "title": "TS2339: Property 'tsReducer' does not exist on type 'DefaultRootState'",
            "linkTo": "stackoverflow",
            "image": {
                "url": "https://images.microcms-assets.io/assets/956df1a3748845c2b6a401bc730a8295/b4d3518c864d44828a1faf0bd2f7fa5a/stackoverflow.webp",
                "height": 316,
                "width": 316
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
            "id": "v5f7s_bo_3m",
            "tag": "Redux"
        },
        {
            "id": "h65ae0o5-w",
            "tag": "React"
        },
        {
            "id": "r_lkkwrxg5m",
            "tag": "TypeScript"
        },
        {
            "id": "tvl1ez9wqhes",
            "tag": "デバッグ備忘録"
        }
    ],
    "image": {
      "url": "",
      "height": 504,
      "width": 960
    },
    "imageAlt": "reduxのロゴ",
    "description": "TypescriptでuseSelectorを使った時に出てくるエラーProperty '〇〇' does not exist on type 'DefaultRootState'の対処法を解説しています。"
  }
}
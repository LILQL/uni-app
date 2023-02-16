"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      swiperList: [],
      navList: [],
      floorList: []
    };
  },
  onLoad() {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
  },
  methods: {
    async getSwiperList() {
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/home/swiperdata");
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg();
      this.swiperList = res.message;
    },
    async getNavList() {
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/home/catitems");
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg();
      this.navList = res.message;
    },
    navClickHandler(item) {
      if (item.name === "\u5206\u7C7B") {
        common_vendor.index.switchTab({
          url: "/pages/cate/cate"
        });
      }
    },
    async getFloorList() {
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/home/floordata");
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg();
      res.message.forEach((floor) => {
        floor.product_list.forEach((prod) => {
          prod.url = "/subpkg/goods_list/goods_list?" + prod.navigator_url.split("?")[1];
        });
      });
      this.floorList = res.message;
      console.log("------floorList", this.floorList);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.swiperList, (item, index, i0) => {
      return {
        a: item.image_src,
        b: `/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`,
        c: index
      };
    }),
    b: common_vendor.f($data.navList, (item, index, i0) => {
      return {
        a: item.image_src,
        b: index,
        c: common_vendor.o(($event) => $options.navClickHandler(item), index)
      };
    }),
    c: common_vendor.f($data.floorList, (item, index, i0) => {
      return common_vendor.e({
        a: item.floor_title.image_src,
        b: item.product_list[0].image_src,
        c: item.product_list[0].image_width + "rpx",
        d: item.product_list[0].url,
        e: index !== 0
      }, index !== 0 ? {
        f: common_vendor.f(item.product_list, (item2, index2, i1) => {
          return {
            a: item2.image_src,
            b: item2.image_width + "rpx",
            c: index2,
            d: item2.url
          };
        })
      } : {}, {
        g: index
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HBuilderXProjects/testa_uni/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);

var dom = document.getElementById("mainhead-chart-container");
var myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false
});
var app = {};

var option;

const colors = ["#ffa100", "#FF5733", "#d61c1c"];
const bgColor = " #ffe3d6 ";
const itemStyle = {
  star5: {
    color: colors[0]
  },
  star4: {
    color: colors[1]
  }
};
const data = [
  {
    name: "Br",
    itemStyle: {
      color: colors[0]
    },
    children: [
      {
        name: "American",
        children: [
          {
            name: "5☆",
            children: [
              {
                name: "Philly Style Bagels"
              }
            ]
          }
        ]
      },
      {
        name: "French",
        children: [
          {
            name: "4☆",
            children: [
              {
                name: "Parc"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Ln",
    itemStyle: {
      color: colors[1]
    },
    children: [
      {
        name: "French",
        children: [
          {
            name: "5☆",
            children: [
              {
                name: "Parc"
              }
            ]
          }
        ]
      },
      {
        name: "Caribbean",
        children: [
          {
            name: "5☆",
            children: [
              {
                name: "Grill N Dutchy "
              }
            ]
          }
        ]
      },
      {
        name: "American",
        children: [
          {
            name: "5☆",
            children: [
              {
                name: "Village Whiskey"
              }
            ]
          }
        ]
      },
      {
        name: "Mexican",
        children: [
          {
            name: "4☆",
            children: [
              {
                name: "La Mula Terca"
              }
            ]
          }
        ]
      },
      {
        name: "Asian",
        children: [
          {
            name: "5☆",
            children: [
              {
                name: "Pho Ga Thanh Thanh (Vietnamese)"
              }
            ]
          },
          {
            name: "4☆",
            children: [
              {
                name: "Han Dynasty (Szechuan)"
              },
              {
                name: "Tuna Bar (Japanese)"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Dn",
    itemStyle: {
      color: colors[2]
    },
    children: [
      {
        name: "Asian",
        children: [
          {
            name: "5☆",
            children: [
              {
                name: "Pho Ga Thanh Thanh \n(Vietnamese)"
              }
            ]
          },
          {
            name: "4☆",
            children: [
              {
                name: "Tuna Bar (Japanese)"
              },
              {
                name: "Han Dynasty (Szechuan)"
              }
            ]
          }
        ]
      },
      {
        name: "Middle \nEastern",
        children: [
          {
            name: "5☆",
            children: [
              {
                name: "Zahav"
              }
            ]
          }
        ]
      },
      {
        name: "Mexican",
        children: [
          {
            name: "5☆",
            children: [
              {
                name: "La Mula Terca"
              }
            ]
          }
        ]
      },
      {
        name: "American",
        children: [
          {
            name: "4☆",
            children: [
              {
                name: "Village Whiskey"
              }
            ]
          }
        ]
      },
      {
        name: "Caribbean",
        children: [
          {
            name: "5☆",
            children: [
              {
                name: "Grill N Dutchy"
              }
            ]
          }
        ]
      },
      {
        name: "French",
        children: [
          {
            name: "4☆",
            children: [
              {
                name: "Parc"
              }
            ]
          }
        ]
      }
    ]
  }
];
for (let j = 0; j < data.length; ++j) {
  let level1 = data[j].children;
  for (let i = 0; i < level1.length; ++i) {
    let block = level1[i].children;
    let restaurantRating = [];
    let restaurantScoreId;
    for (let star = 0; star < block.length; ++star) {
      let style = (function (name) {
        switch (name) {
          case "5☆":
            restaurantScoreId = 0;
            return itemStyle.star5;
          case "4☆":
            restaurantScoreId = 1;
            return itemStyle.star4;
          case "3☆":
            restaurantScoreId = 2;
            return itemStyle.star3;
          case "2☆":
            restaurantScoreId = 3;
            return itemStyle.star2;
        }
      })(block[star].name);
      block[star].label = {
        color: style.color,
        downplay: {
          opacity: 0.5
        }
      };
      if (block[star].children) {
        style = {
          opacity: 1,
          color: style.color
        };
        block[star].children.forEach(function (restaurant) {
          restaurant.value = 1;
          restaurant.itemStyle = style;
          restaurant.label = {
            color: style.color
          };
          let value = 1;
          if (restaurantScoreId === 0 || restaurantScoreId === 3) {
            value = 5;
          }
          if (restaurantScoreId[restaurantScoreId]) {
            restaurantScoreId[restaurantScoreId].value += value;
          } else {
            restaurantScoreId[restaurantScoreId] = {
              color: colors[restaurantScoreId],
              value: value
            };
          }
        });
      }
    }
    level1[i].itemStyle = {
      color: data[j].itemStyle.color
    };
  }
}
option = {
  backgroundColor: bgColor,
  title: {
    text: "Editor's List",
    subtext: "New to Philly or looking to discover other culinary gems in the city? \nYou're in luck! Here are 10 of our favorites.",
    left: '5%',
    top: "center",
    textStyle: {
      fontSize: 70,
      fontStyle: "italic"
    },
    subtextStyle: {
      fontSize: 25
    }
  },
  color: colors,
  series: [
    {
      type: "sunburst",
      center: ["80%", "48%"],
      data: data,
      sort: function (a, b) {
        if (a.depth === 1) {
          return b.getValue() - a.getValue();
        } else {
          return a.dataIndex - b.dataIndex;
        }
      },
      label: {
        rotate: "radial",
        color: bgColor
      },
      itemStyle: {
        borderColor: bgColor,
        borderWidth: 1
      },
      levels: [
        {},
        {
          r0: 0,
          r: 40,
          label: {
            rotate: 0
          }
        },
        {
          r0: 40,
          r: 105
        },
        {
          r0: 115,
          r: 140,
          itemStyle: {
            shadowBlur: 2,
            shadowColor: colors[2],
            color: "transparent"
          },
          label: {
            rotate: "tangential",
            fontSize: 9,
            color: colors[0]
          }
        },
        {
          r0: 140,
          r: 145,
          itemStyle: {
            shadowBlur: 30,
            shadowColor: colors[0]
          },
          label: {
            position: "outside",
            textShadowBlur: 2,
            textShadowColor: "#333"
          },
          downplay: {
            label: {
              opacity: 0.5
            }
          }
        }
      ]
    }
  ]
};

if (option && typeof option === "object") {
  myChart.setOption(option);
};

window.addEventListener("resize", myChart.resize);

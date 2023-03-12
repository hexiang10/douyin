/*
 Navicat Premium Data Transfer

 Source Server         : mysql_127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : 127.0.0.1:3306
 Source Schema         : douyin_cloud

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 24/01/2023 20:23:13
*/

SET NAMES utf8mb4;
SET
FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dy_comment
-- ----------------------------
DROP TABLE IF EXISTS `dy_comment`;
CREATE TABLE `dy_comment`
(
    `id`                varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL,
    `vloger_id`         varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '评论的视频是哪个作者（vloger）的关联id',
    `father_comment_id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '如果是回复留言，则本条为子留言，需要关联查询',
    `vlog_id`           varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '回复的那个视频id',
    `comment_user_id`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '发布留言的用户id',
    `content`           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '留言内容',
    `like_counts`       int                                                           NOT NULL DEFAULT 0 COMMENT '留言的点赞总数',
    `created_time`      datetime(0) NOT NULL COMMENT '留言时间',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '评论表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dy_comment
-- ----------------------------
INSERT INTO `dy_comment`
VALUES ('230124C0C3537TR4', '2110057Y6PN9WMK4', '0', '2109308CKD7ZYNC0', '211003H4SG5Y1ZF8', '。。。。', 0,
        '2023-01-24 16:50:08');
INSERT INTO `dy_comment`
VALUES ('230124CCM998D5KP', '2301170C60N0BNTC', '0', '2110048RAYSPYG54', '211003H4SG5Y1ZF8', '你干嘛', 0,
        '2023-01-24 17:26:50');
INSERT INTO `dy_comment`
VALUES ('230124CG03K7B9P0', '2301170C60N0BNTC', '0', '2110048RAYSPYG54', '211003H4SG5Y1ZF8', '小黑子，你干嘛', 0,
        '2023-01-24 17:33:53');
INSERT INTO `dy_comment`
VALUES ('230124CKCTZKSWZC', '211003H4SG5Y1ZF8', '0', '2109307DX5GFABXP', '211003H4SG5Y1ZF8', 'music', 0,
        '2023-01-24 17:41:16');
INSERT INTO `dy_comment`
VALUES ('230124CYG619MZ7C', '211003H4SG5Y1ZF8', '0', '2109307DX5GFABXP', '2301170C60N0BNTC', '帅哦', 0,
        '2023-01-24 18:08:32');

-- ----------------------------
-- Table structure for dy_fans
-- ----------------------------
DROP TABLE IF EXISTS `dy_fans`;
CREATE TABLE `dy_fans`
(
    `id`                    varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `vloger_id`             varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '作家用户id',
    `fan_id`                varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '粉丝用户id',
    `is_fan_friend_of_mine` int                                                          NOT NULL COMMENT '粉丝是否是vloger的朋友，如果成为朋友，则本表的双方此字段都需要设置为1，如果有一人取关，则两边都需要设置为0',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `writer_id`(`vloger_id`, `fan_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '粉丝表\r\n\r\n' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dy_fans
-- ----------------------------
INSERT INTO `dy_fans`
VALUES ('230124BWBK0W4R68', '2301170C60N0BNTC', '211003H4SG5Y1ZF8', 1);
INSERT INTO `dy_fans`
VALUES ('230124CTPT6P6YK4', '211003H4SG5Y1ZF8', '2301170C60N0BNTC', 1);

-- ----------------------------
-- Table structure for dy_my_liked_vlog
-- ----------------------------
DROP TABLE IF EXISTS `dy_my_liked_vlog`;
CREATE TABLE `dy_my_liked_vlog`
(
    `id`      varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `user_id` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户id',
    `vlog_id` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '喜欢的短视频id',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `writer_id`(`user_id`, `vlog_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '点赞短视频关联表\r\n' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dy_my_liked_vlog
-- ----------------------------
INSERT INTO `dy_my_liked_vlog`
VALUES ('230124CG3F41G2W0', '211003H4SG5Y1ZF8', '2109307DX5GFABXP');
INSERT INTO `dy_my_liked_vlog`
VALUES ('230124C0AD5Z75D4', '211003H4SG5Y1ZF8', '2109308CKD7ZYNC0');
INSERT INTO `dy_my_liked_vlog`
VALUES ('230124B1WRFCHPX4', '211003H4SG5Y1ZF8', '2110048RAYSPYG54');

-- ----------------------------
-- Table structure for dy_user
-- ----------------------------
DROP TABLE IF EXISTS `dy_user`;
CREATE TABLE `dy_user`
(
    `id`                       varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '主键',
    `mobile`                   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '手机号',
    `nickname`                 varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '昵称',
    `imooc_num`                varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci  NOT NULL COMMENT '抖音号，唯一标识，需要限制修改次数，比如终生1次，每年1次，每半年1次等，可以用于付费修改。',
    `face`                     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '头像',
    `sex`                      int                                                           NOT NULL DEFAULT 2 COMMENT '性别：1:男  0:女  2:保密',
    `birthday`                 datetime(0) NOT NULL COMMENT '生日',
    `country`                  varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '国家',
    `province`                 varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '省份',
    `city`                     varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '城市',
    `description`              varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '简介',
    `bg_img`                   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '个人介绍的背景图',
    `can_imooc_num_be_updated` int NULL DEFAULT 1 COMMENT '抖音号能否被修改：1：默认，可以修改；0，无法修改',
    `created_time`             datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
    `updated_time`             datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
    `del_flag`                 int NULL DEFAULT 0 COMMENT '逻辑删除：0正常；1删除',
    `state`                    int NULL DEFAULT 0 COMMENT '用户状态：0正常；1封禁',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `mobile`(`mobile`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dy_user
-- ----------------------------
INSERT INTO `dy_user`
VALUES ('211003H4SG5Y1ZF8', '13912345678', '肖黑子', '211003H4SG5Y1ZF8',
        'https://img-blog.csdnimg.cn/2592a77c1b45499ea109d39d67aa827b.jpeg', 1, '2000-10-10 08:00:00', '中国', '广东省',
        '珠海市', '迎面走来的你让我如此蠢蠢欲动~', 'https://img-blog.csdnimg.cn/a29d24a864c94d089c3850c705d44197.png',
        1, '2021-09-29 23:44:51', '2023-01-13 17:23:10', 0, 0);
INSERT INTO `dy_user`
VALUES ('2110057Y6PN9WMK4', '13911111111', '纯鹿人', '2110057Y6PN9WMK4',
        'https://img-blog.csdnimg.cn/0f52e151e96640cbb9e20607c58ccbc6.jpeg', 0, '1990-01-01 00:00:00', '中国', '广东省',
        '深圳市', '全名制作人大家好，我是练习时长两年半的纯鹿人~',
        'https://img-blog.csdnimg.cn/a29d24a864c94d089c3850c705d44197.png', 1, '2021-10-05 11:07:16',
        '2021-10-05 11:07:16', 0, 0);
INSERT INTO `dy_user`
VALUES ('211005800N0W837C', '13922222222', '梅素芝', '211005800N0W837C',
        'https://img-blog.csdnimg.cn/f337ebb70d074125864bf4f33e97170f.jpeg', 0, '1970-01-01 00:00:00', '中国', '广东省',
        '广州市', '素汁都没有，凭什么来说我家鸽鸽！', 'https://img-blog.csdnimg.cn/a29d24a864c94d089c3850c705d44197.png',
        1, '2021-10-05 11:12:37', '2021-10-05 11:12:37', 0, 0);
INSERT INTO `dy_user`
VALUES ('2110058BX246X39P', '13933333333', '苏珊', '2110058BX246X39P',
        'https://img-blog.csdnimg.cn/0577a8fac3004570be5255cf9501569b.jpeg', 0, '1980-01-01 00:00:00', '中国', '广东省',
        '中山市', '荔枝？你叫我拿什么来荔枝？', 'https://img-blog.csdnimg.cn/a29d24a864c94d089c3850c705d44197.png', 1,
        '2021-10-05 11:48:16', '2021-10-05 11:48:16', 0, 0);
INSERT INTO `dy_user`
VALUES ('2110058D0KPZSCH0', '13944444444', '史油饼', '2110058D0KPZSCH0',
        'https://img-blog.csdnimg.cn/e48698780655405cb94b78920b1ffb83.jpeg', 1, '1991-01-01 00:00:00', '中国', '广东省',
        '韶关市', '饿货！你到底食不食油饼啊~', 'https://img-blog.csdnimg.cn/a29d24a864c94d089c3850c705d44197.png', 1,
        '2021-10-05 11:51:39', '2021-10-05 11:51:39', 0, 0);
INSERT INTO `dy_user`
VALUES ('2110058DPP1ZPKKP', '13955555555', '绿尸寒', '2110058DPP1ZPKKP',
        'https://img-blog.csdnimg.cn/9b0e8fc180364e539d8bbda9bab9ac96.jpeg', 1, '1992-03-01 00:00:00', '中国', '广东省',
        '茂名市', '再近一点，靠近点，就会爆炸！', 'https://img-blog.csdnimg.cn/a29d24a864c94d089c3850c705d44197.png', 1,
        '2021-10-05 11:53:48', '2021-10-05 11:53:48', 0, 0);
INSERT INTO `dy_user`
VALUES ('2301170C60N0BNTC', '13966666666', '尼甘玛', '2301170C60N0BNTC',
        'https://img-blog.csdnimg.cn/cbd4ad15ccf141bb8593967c4351a83b.jpeg', 2, '2023-01-17 00:36:41', '中国', '广东省',
        '梅州市', '你干嘛~哎呦', 'https://img-blog.csdnimg.cn/a29d24a864c94d089c3850c705d44197.png', 1,
        '2023-01-17 00:36:41', '2023-01-19 21:23:49', 0, 0);

-- ----------------------------
-- Table structure for dy_vlog
-- ----------------------------
DROP TABLE IF EXISTS `dy_vlog`;
CREATE TABLE `dy_vlog`
(
    `id`              varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `vloger_id`       varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '对应用户表id，vlog视频发布者',
    `url`             longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '视频播放地址',
    `cover`           longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '视频封面',
    `title`           varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '视频标题，可以为空',
    `width`           int                                                          NOT NULL COMMENT '视频width',
    `height`          int                                                          NOT NULL COMMENT '视频height',
    `like_counts`     int                                                          NOT NULL DEFAULT 0 COMMENT '点赞总数',
    `comments_counts` int                                                          NOT NULL DEFAULT 0 COMMENT '评论总数',
    `is_private`      int                                                          NOT NULL DEFAULT 0 COMMENT '是否私密，用户可以设置私密，如此可以不公开给比人看',
    `created_time`    datetime(0) NOT NULL COMMENT '创建时间 创建时间',
    `updated_time`    datetime(0) NOT NULL COMMENT '更新时间 更新时间',
    `del_flag`        int NULL DEFAULT 0 COMMENT '逻辑删除：0正常，1删除',
    `state`           int NULL DEFAULT 0 COMMENT '视频状态：0正常，1下架',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '短视频表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dy_vlog
-- ----------------------------
INSERT INTO `dy_vlog`
VALUES ('2109307DX5GFABXP', '211003H4SG5Y1ZF8', 'http://1.12.42.148:9000/douyin-cloud/test/video/01.mp4',
        'https://img-blog.csdnimg.cn/24157ab93ac04df6a8c7d5ca4c78fbc8.png', '🐓你太美⛹️‍♂️电光版！炫酷登场🏀', 184, 320, 0,
        0, 0, '2023-01-18 23:15:03', '2023-01-19 22:12:35', 0, 0);
INSERT INTO `dy_vlog`
VALUES ('2109308CKD7ZYNC0', '2110057Y6PN9WMK4', 'http://1.12.42.148:9000/douyin-cloud/test/video/02.mp4',
        'https://img-blog.csdnimg.cn/3327b5af526b4ef6875b2f4b0f042b9b.png', '布洛坤胶囊——止痛两年半！', 184, 320, 0, 0,
        0, '2023-01-18 14:47:07', '2023-01-18 14:47:07', 0, 0);
INSERT INTO `dy_vlog`
VALUES ('211001BKH355BGHH', '211005800N0W837C', 'http://1.12.42.148:9000/douyin-cloud/test/video/03.mp4',
        'https://img-blog.csdnimg.cn/8c6d8113587b4b3a9a73a9bd1e277456.png', '只因焖香菇！素汁超好喝🤤', 184, 320, 0, 0, 0,
        '2023-01-18 13:21:04', '2023-01-18 13:21:07', 0, 0);
INSERT INTO `dy_vlog`
VALUES ('211003HC19CASM3C', '2110058BX246X39P', 'http://1.12.42.148:9000/douyin-cloud/test/video/04.mp4',
        'https://img-blog.csdnimg.cn/e8f7cf35e9954589996428075855ce4a.png', '苏珊考考你：坤坤食谱知多少🤭', 184, 320, 0,
        0, 0, '2023-01-18 14:23:23', '2023-01-18 14:23:26', 0, 0);
INSERT INTO `dy_vlog`
VALUES ('2110048PYTNFGCZC', '2110058D0KPZSCH0', 'http://1.12.42.148:9000/douyin-cloud/test/video/05.mp4',
        'https://img-blog.csdnimg.cn/ad92219da7c74af5855ae85123e4ba34.png', '鸡哥教你食油饼，快来尝尝吧！', 184, 320, 0,
        0, 0, '2023-01-18 14:29:54', '2023-01-18 14:29:56', 0, 0);
INSERT INTO `dy_vlog`
VALUES ('2110048R6R5WW0M8', '2110058DPP1ZPKKP', 'http://1.12.42.148:9000/douyin-cloud/test/video/06.mp4',
        'https://img-blog.csdnimg.cn/ed12d6e850864a16ad62e7f62fd69947.png', '敢黑我家鸽鸽！绿尸寒警告⚠', 184, 320, 0, 0,
        0, '2023-01-18 11:47:07', '2023-01-18 11:47:10', 0, 0);
INSERT INTO `dy_vlog`
VALUES ('2110048RAYSPYG54', '2301170C60N0BNTC', 'http://1.12.42.148:9000/douyin-cloud/test/video/07.mp4',
        'https://img-blog.csdnimg.cn/9cef945f2a0743028b4e4f39ab4b4f3c.png', '你干嘛~哎呦~妈耶~', 184, 320, 0, 0, 0,
        '2023-01-18 14:56:24', '2023-01-18 14:56:24', 0, 0);

-- ----------------------------
-- Table structure for test_crud_tuser
-- ----------------------------
DROP TABLE IF EXISTS `test_crud_tuser`;
CREATE TABLE `test_crud_tuser`
(
    `id`          bigint                                                       NOT NULL AUTO_INCREMENT COMMENT '主键',
    `uid`         varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '编号',
    `username`    varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
    `password`    varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
    `phone`       varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '电话',
    `profile`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '暂无简介' COMMENT '简介',
    `avatar`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif' COMMENT '头像',
    `sex`         int NULL DEFAULT 0 COMMENT '性别：未知0；男1；女2',
    `state`       int NULL DEFAULT 0 COMMENT '用户状态；0正常，1封禁',
    `del_flag`    int NULL DEFAULT 0 COMMENT '删除标志；0正常，1删除',
    `birthday`    datetime(0) NULL DEFAULT NULL COMMENT '出生日期',
    `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
    `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '测试用户信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of test_crud_tuser
-- ----------------------------
INSERT INTO `test_crud_tuser`
VALUES (1, 'dy20230101admin', 'admin', 'admin', '13866666666', '暂无简介',
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', 0, 0, 0, '2023-01-01 00:00:00',
        '2023-01-01 00:00:00', '2023-01-01 00:00:00');

-- ----------------------------
-- Table structure for test_dubbo_order
-- ----------------------------
DROP TABLE IF EXISTS `test_dubbo_order`;
CREATE TABLE `test_dubbo_order`
(
    `id`     bigint NOT NULL AUTO_INCREMENT COMMENT '订单id',
    `userId` bigint NOT NULL COMMENT '用户id',
    `name`   varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品名称',
    `price`  bigint NOT NULL COMMENT '商品价格',
    `num`    int NULL DEFAULT 0 COMMENT '商品数量',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `username`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 108 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of test_dubbo_order
-- ----------------------------
INSERT INTO `test_dubbo_order`
VALUES (101, 1, 'Apple 苹果 iPhone 12 ', 699900, 1);
INSERT INTO `test_dubbo_order`
VALUES (102, 2, '雅迪 yadea 新国标电动车', 209900, 1);
INSERT INTO `test_dubbo_order`
VALUES (103, 3, '骆驼（CAMEL）休闲运动鞋女', 43900, 1);
INSERT INTO `test_dubbo_order`
VALUES (104, 4, '小米10 双模5G 骁龙865', 359900, 1);
INSERT INTO `test_dubbo_order`
VALUES (105, 5, 'OPPO Reno3 Pro 双模5G 视频双防抖', 299900, 1);
INSERT INTO `test_dubbo_order`
VALUES (106, 6, '美的（Midea) 新能效 冷静星II ', 544900, 1);
INSERT INTO `test_dubbo_order`
VALUES (107, 2, '西昊/SIHOO 人体工学电脑椅子', 79900, 1);
INSERT INTO `test_dubbo_order`
VALUES (108, 3, '梵班（FAMDBANN）休闲男鞋', 31900, 1);

-- ----------------------------
-- Table structure for test_dubbo_user
-- ----------------------------
DROP TABLE IF EXISTS `test_dubbo_user`;
CREATE TABLE `test_dubbo_user`
(
    `id`       bigint NOT NULL AUTO_INCREMENT,
    `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '收件人',
    `address`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地址',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of test_dubbo_user
-- ----------------------------
INSERT INTO `test_dubbo_user`
VALUES (1, '柳岩', '湖南省衡阳市');
INSERT INTO `test_dubbo_user`
VALUES (2, '文二狗', '陕西省西安市');
INSERT INTO `test_dubbo_user`
VALUES (3, '华沉鱼', '湖北省十堰市');
INSERT INTO `test_dubbo_user`
VALUES (4, '张必沉', '天津市');
INSERT INTO `test_dubbo_user`
VALUES (5, '郑爽爽', '辽宁省沈阳市大东区');
INSERT INTO `test_dubbo_user`
VALUES (6, '范兵兵', '山东省青岛市');

SET
FOREIGN_KEY_CHECKS = 1;

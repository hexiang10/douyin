

<p align="center">
	<img alt="logo" src="https://raw.githubusercontent.com/hexiang10/douyin/beta/assets/01.png">
</p>
<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">DouYin v1.0</h1>
<h4 align="center">基于微服务的仿抖音APP应用的设计与开发</h4>
<p align="center">
	<a href="https://github.com/hexiang10/douyin"><img src="https://img.shields.io/github/stars/hexiang10/douyin.svg?style=social&label=Stars"></a>
	<a href="https://gitee.com/y_project/RuoYi-Vue"><img src="https://img.shields.io/badge/DouYin-V1.0-brightgreen.svg"></a>
	<a href="https://www.oracle.com/java/technologies/downloads/"><img src="https://img.shields.io/badge/Java-8-blue.svg"></a>
  	<a href="https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E"><img src="https://img.shields.io/badge/Spring Cloud-alibaba-blue.svg"></a>
</p>



## 作者简介

👉： <a herf="https://hexiang10.github.io/hexiang10/" target="blank">https://hexiang10.github.io/hexiang10/</a>

## 项目简介

在网络技术飞速发展的今天，短视频社交类型的产品也越来越受到广大网民的青睐。其中，网络直播、短视频等新概念也成为互联网业界的关注焦点。短视频社交平台作为一种能够在任何时间、任何地点上传、分享个人生活和娱乐录像的网络应用，是广大网民展示自我、表达情感的一个重要平台。它不仅是一种交流方式，也是我们日常生活中不可或缺的工具。因此，设计并开发出一款优秀、高质量、能够满足用户需求的短视频社交平台应用，也将在未来会给我们带来更大的机遇。

## 技术体系
|         前端          |                             后端                             |
| :-------------------: | :----------------------------------------------------------: |
| Vue、Uniapp、Unicloud | Spring Cloud Alibaba、Mybatis-Plus、MySQL、Redis、Minio、MongoDB、RabbitMQ、Docker |

## 技术架构

系统使用的微服务解决方案是基于SpringCloud以及SpringCloud Alibaba的微服务框架，通过各种微服务组件为系统提供服务治理功能，主要组件有Gateway、Nacos、dubbo等。所有的用户在请求时，可以与CDN服务异步通信，CDN在处理完用户请求可以将信息发送给服务端；服务端接收到用户请求时，Nginx会对其进行处理，若为静态资源，则直接获取资源返回，若是与服务相关请求，则会负载均衡转发至Gateway网关，Gateway作为系统的API网关，鉴权认证都需要经过Gateway进而转发到各个微服务中再进行相应的处理，Nacos的作用是为系统提供服务的注册发现与服务配置的功能，服务端存放着注册过的服务列表，客户端可以从服务端获取到可用的服务列表进而访问服务，客户端与服务端之间以心跳的方式保证正确的连接状态；服务端会从配置服务器中获得配置信息并供客户端获取，客户端可以从服务端获取到其从配置服务器拉取的配置信息并进行加载。

![](https://raw.githubusercontent.com/hexiang10/douyin/beta/assets/02.png)

## 功能模块

短视频社交平台可以分为如下几个部分，即用户服务、短视频服务、粉丝服务、评论服务、消息服务、后台服务等。用户服务中包含了用户的注册、登录、注销、修改个人信息、查看个人信息等功能；短视频服务包含用户可以发布视频，查询视频，搜索视频，编辑视频，点赞视频，评论视频，下载分享视频等功能；粉丝服务包含了关注用户，查询关注列表，查询是否关注，查询朋友关系；评论服务包括了发布评论，获取评论，回复评论，点赞评论；消息服务包括发送消息，删除消息；后台管理服务包括用户管理，权限管理，视频管理，评论管理，数据统计。

![](https://raw.githubusercontent.com/hexiang10/douyin/beta/assets/03.png)

## 功能演示

### 用户登录/注册实现效果图

![在这里插入图片描述](https://raw.githubusercontent.com/hexiang10/douyin/beta/assets/04.png)

### 用户注销登出实现效果图
![在这里插入图片描述](https://raw.githubusercontent.com/hexiang10/douyin/beta/assets/05.png)
### 个人信息功能实现效果图
![在这里插入图片描述](https://raw.githubusercontent.com/hexiang10/douyin/beta/assets/06.png)
### 视频展示功能实现效果图
![在这里插入图片描述](https://raw.githubusercontent.com/hexiang10/douyin/beta/assets/07.png)
### 视频上传功能实现效果图
![在这里插入图片描述](https://raw.githubusercontent.com/hexiang10/douyin/beta/assets/08.png)
### 视频搜索实现效果图
![在这里插入图片描述](https://raw.githubusercontent.com/hexiang10/douyin/beta/assets/09.png)
### 视频下载和分享功能实现效果图
![image-20230315182506725](https://raw.githubusercontent.com/hexiang10/douyin/beta/assets/10.png)
### 视频私密公开功能实现效果图
![在这里插入图片描述](https://raw.githubusercontent.com/hexiang10/douyin/beta/assets/11.png)

### 视频点赞功能实现效果图
![在这里插入图片描述](https://raw.githubusercontent.com/hexiang10/douyin/beta/assets/12.png)
### 粉丝业务功能实现效果图
![在这里插入图片描述](https://raw.githubusercontent.com/hexiang10/douyin/beta/assets/13.png)
### 评论业务功能实现效果图
![在这里插入图片描述](https://raw.githubusercontent.com/hexiang10/douyin/beta/assets/14.png)
### 消息业务功能实现效果图
![在这里插入图片描述](https://raw.githubusercontent.com/hexiang10/douyin/beta/assets/15.png)

## 支持一下

![](https://gitcode.net/HXBest/storage/-/raw/images/qr_code/vx-pay.jpg)

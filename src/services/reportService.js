const Message = require("../models/message");
const Account = require("../models/account");
const post = require("../models/post");
const report = require("../models/report");
const result_report = require("../models/result_report");
const MyDate = require("../models/mydate");
const Post = require("../models/post");
const Reports = require("../models/report");

async function getAllReport(page) {
  try {
    const reportModel = new report();
    var posts = await reportModel.getAllReport();
    const perPage = 10;
    var lastPage = Math.ceil(posts.length / perPage);
    if (lastPage === 0) lastPage = 1;
    const pageNumber = parseInt(page) || 1;
    if (pageNumber < 1 || pageNumber > lastPage)
      throw {
        errCode: 3,
        errMessage: "Page number not correct",
      };
    const start = (pageNumber - 1) * perPage;
    const end = pageNumber * perPage;
    const prev = pageNumber === 1 ? false : pageNumber - 1;
    const next = pageNumber === lastPage ? false : pageNumber + 1;
    posts = Array.from(posts).slice(start, end);
    return {
      errCode: 0,
      errMessage: "OK",
      posts: posts,
      prev: prev,
      next: next,
      lastPage: lastPage,
    };
  } catch (err) {
    throw err;
  }
}

async function denyReport(idPost) {
  try {
    const result_reportModel = new result_report();
    await result_reportModel.checkReport(idPost);
    //Xu ly thoi gian
    let time = new MyDate();
    let time_change = time.toDate() + " " + time.toLocaleTimeString();
    await result_reportModel.denyReport(idPost, time_change);
    return {
      errCode: 0,
      errMessage: "OK",
    };
  } catch (err) {
    throw err;
  }
}

async function acceptReport(idPost) {
  try {
    const result_reportModel = new result_report();
    await result_reportModel.checkReport(idPost);
    //Xu ly thoi gian
    let time = new MyDate();
    let time_change = time.toDate() + " " + time.toLocaleTimeString();
    await result_reportModel.acceptReport(idPost, time_change);
    await new Post().DeletePostByID(idPost);
    await new Account().AddWarningPost(idPost);
    return {
      errCode: 0,
      errMessage: "OK",
    };
  } catch (err) {
    throw err;
  }
}

async function createReport(idPost, idUser, content) {
  try {
    const result_reportModel = new result_report();
    //Xu ly thoi gian
    let time = new MyDate();
    let time_change = time.toDate() + " " + time.toLocaleTimeString();
    const message = result_reportModel.createReport(
      idPost,
      idUser,
      content,
      time_change
    );
    return message;
  } catch (err) {
    throw err;
  }
}

async function addReportToReport(idPost, idUser, content, timeReport) {
  try {
    const message = new Reports().addReport(
      idPost,
      idUser,
      content,
      timeReport
    );
    return message;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllReport: getAllReport,
  denyReport: denyReport,
  acceptReport: acceptReport,
  createReport: createReport,
  addReportToReport: addReportToReport,
};

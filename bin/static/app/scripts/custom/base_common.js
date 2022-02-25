
/**
 * ２重送信防止フラグ
 */
var lockFlag = false;
if (parent.lockFlag != undefined) {
	parent.lockFlag = false;
}
/**
 * ２重送信防止.
 *
 * 戻り値： boolean true：送信済、false：未送信
 */
function lockCheck() {
	var f = parent.lockFlag;
	if (f != undefined) {
		lockFlag = f;
	}
	if (lockFlag) {
		alert('既にサブミットされています');
		return false;
	}
	lockFlag = true;
	if (f != undefined) {
		parent.lockFlag = true;
	}
	return true;
}
/**
 * ２重送信防止(メッセージ出力なし).
 *
 * 戻り値： boolean true：送信済、false：未送信
 */
function lockCheck2() {
	var f = parent.lockFlag;
	if (f != undefined) {
		lockFlag = f;
	}
	if (lockFlag) {
		return false;
	}
	lockFlag = true;
	if (f != undefined) {
		parent.lockFlag = true;
	}
	return true;
}
/**
 * ２重送信防止.
 * ロックなし
 *
 * 戻り値： boolean true：送信済、false：未送信
 */
function noLockCheck() {
	return lockFlag;
}
/**
 * ２重送信防止.
 * フラグを戻す.
 */
function lockCancel() {
	lockFlag = false;
}
/**
 * ２重送信チェック後にsubmit
 *
 * 引数  ： form フォーム
 * 引数  ： pass actionパス
 * 引数  ： target target
 * 戻り値： boolean true：1回目の送信、false：２重送信
 */
function checkSubmit() {
	var result = false;
	 switch (arguments.length) {
		 case 1:
			 result = checkSubmit1(arguments[0]);
			 break;
		 case 2:
			 result = checkSubmit2(arguments[0], arguments[1]);
			 break;
		 case 3:
			 result = checkSubmit3(arguments[0], arguments[1], arguments[2]);
			 break;
		 default:
	 }
	 return result;
}
// 引数１個
function checkSubmit1(form) {
	if (lockCheck()) {
		form.method = "POST";

		// 業務の場合はForwardActionで経由する
		setTargetAction(form);

		form.submit();

		// ForwardActionで経由した場合はactionを戻す
		resetTargetAction(form);

		return true;
	}
	return false;
}
//引数２個
function checkSubmit2(form, pass) {
	form.action = pass;
	return checkSubmit1(form);
}
//引数３個
function checkSubmit3(form, pass, target) {
	form.action = pass;
	form.target = target;
	return checkSubmit1(form);
}

window.onunload = function() {
	if (document.forms[0] != undefined) {
		if (document.forms[0].elements["actionCode"] == undefined
				|| document.forms[0].elements["actionCode"].value == ""
				|| document.forms[0].elements["actionCode"].value == "null") {
			event.cancelBubble = true;
			return false;
		}
	}
};


// 「表示」ボタンのnameプロパティ値
var dispBtnName = "disp";
var altGBtnName = "altG";
var altIBtnName = "altI";
var altKBtnName = "altK";
var altQBtnName = "altQ";
var altWBtnName = "altW";
var altXBtnName = "altX";
var altYBtnName = "altY";
var alt1BtnName = "alt1";
var alt2BtnName = "alt2";
var alt3BtnName = "alt3";
var alt4BtnName = "alt4";
var alt5BtnName = "alt5";
var alt6BtnName = "alt6";
var alt7BtnName = "alt7";
var alt8BtnName = "alt8";
var alt9BtnName = "alt9";
var alt0BtnName = "alt0";

/*
 * ショートカットキーの抑止。
 * 抑止しているキーは以下の通り。
 *   Backspace （戻る）
 *   Alt + ←  （戻る）
 *   Alt + →  （進む）
 *   Alt + Home（ホームページへ移動）
 *   ESC       （ページの読込中止）
 *   Ctrl + B  （お気に入りの整理を表示）
 *   Ctrl + D  （表示されているページをお気に入りに追加）
 *   Ctrl + H  （履歴を表示）
 *   Ctrl + I  （お気に入り表示）
 *   Ctrl + R  （最新の状態に更新）
 *   F2～F12
 */
//function document.onkeydown() {
document.onkeydown = function() {

	// readOnlyでのBackSpace抑止（メッセージ出力はしない）
	// BackSpaceのみを抑止
	if((event.srcElement.tagName == 'INPUT' || event.srcElement.tagName == 'TEXTAREA')
			&& event.srcElement.readOnly==true && event.keyCode == 8){
		return false;
	}
	// Backspace
	if((event.keyCode == 8
			&& !((event.srcElement.tagName == 'INPUT'
				&& (event.srcElement.type == 'text'
					|| event.srcElement.type == 'file'
						|| event.srcElement.type == 'password'))
						|| event.srcElement.tagName == 'TEXTAREA'))
						// Enter
//						|| (event.keyCode == 13
//								&& !(event.srcElement.tagName == 'TEXTAREA'))
								|| (event.altKey &&
										// Alt + ←
										(event.keyCode == 37
												// Alt + →
												|| event.keyCode == 39))
												// Esc
												|| event.keyCode == 27
												|| (event.ctrlKey &&
														// Ctrl + B
														(event.keyCode == 66
																// Ctrl + D
																|| event.keyCode == 68
																// Ctrl + H
																|| event.keyCode == 72
																// Ctrl + I
																|| event.keyCode == 73
																// Ctrl + R
																|| event.keyCode == 82))) {
		return false;
	}
	// Alt + Home
	else if (event.altKey && event.keyCode == 36) {
		return false;
	}
	// F2 ～ F12
	else if (112 <= event.keyCode && event.keyCode <= 123) {
		event.cancelBubble = true;
		event.returnValue = false;
		event.keyCode = 0;
	}
	// ショートカットキーの定義
	// Alt + B （表示ボタン）
	else if (event.altKey && event.keyCode == 66) {
		var btn = document.getElementsByName(dispBtnName);
		if (btn != null && btn.length != undefined && btn.length > 0) {
			btn = btn[0];
			if (btn != null && btn.type == "button") {
				btn.click();
			}
		}
	}
	// Alt + G （ボタン）
	else if (event.altKey && event.keyCode == 71) {
		var btn = document.getElementsByName(altGBtnName);
		if (btn != null && btn.length != undefined && btn.length > 0) {
			btn = btn[0];
			if (btn != null && btn.type == "button") {
				btn.click();
			}
		}
	}
	// Alt + I （ボタン）
	else if (event.altKey && event.keyCode == 73) {
		var btn = document.getElementsByName(altIBtnName);
		if (btn != null && btn.length != undefined && btn.length > 0) {
			btn = btn[0];
			if (btn != null && btn.type == "button") {
				btn.click();
			}
		}
	}
	// Alt + K （ボタン）
	else if (event.altKey && event.keyCode == 75) {
		var btn = document.getElementsByName(altKBtnName);
		if (btn != null && btn.length != undefined && btn.length > 0) {
			btn = btn[0];
			if (btn != null && btn.type == "button") {
				btn.click();
			}
		}
	}
	// Alt + Q （ボタン）
	else if (event.altKey && event.keyCode == 81) {
		var btn = document.getElementsByName(altQBtnName);
		if (btn != null && btn.length != undefined && btn.length > 0) {
			btn = btn[0];
			if (btn != null && btn.type == "button") {
				btn.click();
			}
		}
	}
	// Alt + W （ボタン）
	else if (event.altKey && event.keyCode == 87) {
		var btn = document.getElementsByName(altWBtnName);
		if (btn != null && btn.length != undefined && btn.length > 0) {
			btn = btn[0];
			if (btn != null && btn.type == "button") {
				btn.click();
			}
		}
	}
	// Alt + X （ボタン）
	else if (event.altKey && event.keyCode == 88) {
		var btn = document.getElementsByName(altXBtnName);
		if (btn != null && btn.length != undefined && btn.length > 0) {
			btn = btn[0];
			if (btn != null && btn.type == "button") {
				btn.click();
			}
		}
	}
	// Alt + Y （ボタン）
	else if (event.altKey && event.keyCode == 89) {
		var btn = document.getElementsByName(altYBtnName);
		if (btn != null && btn.length != undefined && btn.length > 0) {
			btn = btn[0];
			if (btn != null && btn.type == "button") {
				btn.click();
			}
		}
	}
	// Alt + 1 （ボタン）
	else if (event.altKey && event.keyCode == 49) {
		var btn = document.getElementsByName(alt1BtnName);
		if (btn != null && btn.length != undefined && btn.length > 0) {
			btn = btn[0];
			if (btn != null && btn.type == "button") {
				btn.click();
			}
		}
	}
	// Alt + 2 （ボタン）
	else if (event.altKey && event.keyCode == 50) {
		var btn = document.getElementsByName(alt2BtnName);
		if (btn != null && btn.length != undefined && btn.length > 0) {
			btn = btn[0];
			if (btn != null && btn.type == "button") {
				btn.click();
			}
		}
	}
	// Alt + 3 （ボタン）
	else if (event.altKey && event.keyCode == 51) {
		var btn = document.getElementsByName(alt3BtnName);
		if (btn != null && btn.length != undefined && btn.length > 0) {
			btn = btn[0];
			if (btn != null && btn.type == "button") {
				btn.click();
			}
		}
	}
	// Alt + 4 （ボタン）
	else if (event.altKey && event.keyCode == 52) {
		var btn = document.getElementsByName(alt4BtnName);
		if (btn != null && btn.length != undefined && btn.length > 0) {
			btn = btn[0];
			if (btn != null && btn.type == "button") {
				btn.click();
			}
		}
	}
	// Alt + 5 （ボタン）
	else if (event.altKey && event.keyCode == 53) {
		var btn = document.getElementsByName(alt5BtnName);
		if (btn != null && btn.length != undefined && btn.length > 0) {
			btn = btn[0];
			if (btn != null && btn.type == "button") {
				btn.click();
			}
		}
	}
	// Alt + 6 （ボタン）
	else if (event.altKey && event.keyCode == 54) {
		var btn = document.getElementsByName(alt6BtnName);
		if (btn != null && btn.length != undefined && btn.length > 0) {
			btn = btn[0];
			if (btn != null && btn.type == "button") {
				btn.click();
			}
		}
	}
	// Alt + 7 （ボタン）
	else if (event.altKey && event.keyCode == 55) {
		var btn = document.getElementsByName(alt7BtnName);
		if (btn != null && btn.length != undefined && btn.length > 0) {
			btn = btn[0];
			if (btn != null && btn.type == "button") {
				btn.click();
			}
		}
	}
	// Alt + 8 （ボタン）
	else if (event.altKey && event.keyCode == 56) {
		var btn = document.getElementsByName(alt8BtnName);
		if (btn != null && btn.length != undefined && btn.length > 0) {
			btn = btn[0];
			if (btn != null && btn.type == "button") {
				btn.click();
			}
		}
	}
	// Alt + 9 （ボタン）
	else if (event.altKey && event.keyCode == 57) {
		var btn = document.getElementsByName(alt9BtnName);
		if (btn != null && btn.length != undefined && btn.length > 0) {
			btn = btn[0];
			if (btn != null && btn.type == "button") {
				btn.click();
			}
		}
	}
	// Alt + 0 （ボタン）
	else if (event.altKey && event.keyCode == 48) {
		var btn = document.getElementsByName(alt0BtnName);
		if (btn != null && btn.length != undefined && btn.length > 0) {
			btn = btn[0];
			if (btn != null && btn.type == "button") {
				btn.click();
			}
		}
	}
	// Enter
	else if (((event.srcElement.tagName != 'INPUT' && event.srcElement.tagName != 'TEXTAREA')
			|| (event.srcElement.tagName == 'INPUT' && event.srcElement.type != 'button'))
			&& event.keyCode == 13) {
		var count = document.forms[0].length;
		var i = 0;
		for (i = 0; i < count; ++i) {
			var obj = document.forms[0].elements[i];
			if (obj == event.srcElement) {
				++i;
				while ( i < count) {
					var next = document.forms[0].elements[i];
					if (!(next.tagName == 'INPUT' && next.type == 'hidden') && next.readOnly != true) {
						next.focus();
						return false;
					}
					++i;
				}
			}
		}
		return false;
	}

	return true;
};

// F1の抑止
//function document.onhelp() {
document.onhelp = function() {
	event.cancelBubble = true;
	event.returnValue = false;
};

// Shift + マウスホイールの抑止
//function document.onmousewheel() {
document.onmousewheel = function() {
	if (event.shiftKey) {
		return false;
	}
	return true;
};

/**
 * ×ボタンイベント処理.
 * window.onbeforeunload()に実装する.
 *
 * 引数  ： form フォーム
 * 引数  ： pass actionパス
 */
function onbeforeunloadCommon(form, pass) {
	if(((event.clientX > document.body.clientWidth) && (event.clientY<0)) || event.altKey ) {
		// ログアウト処理
		checkSubmit(form, pass);
	}
}

/**
 * フレーム分割時の各フレーム、および親画面におけるトークンの同期をとる.
 * オンロード時に使用.
 *
 * 引数  ： doc document
 */
function synchronizedToken(doc) {
	if(doc != undefined && doc.forms[0] != undefined) {
		var token = doc.forms[0].elements["org.apache.struts.taglib.html.TOKEN"];
		if(token != undefined) {
			//各フレームのトークンを設定
			for(var i = 0; i < parent.frames.length; i++) {
				var parentForm = parent.frames[i].document.forms[0];
				if(parentForm != undefined && parentForm.elements["org.apache.struts.taglib.html.TOKEN"] != undefined) {
					parentForm.elements["org.apache.struts.taglib.html.TOKEN"].value = token.value;
				}
			}
			//親画面のトークンを設定
			//if (window.opener != undefined) {
			var parentWindow = window.opener;
			if (parentWindow == undefined) {
				parentWindow = window.dialogArguments;
			}
			if (parentWindow != undefined) {
				var windowForm = parentWindow.document.forms[0];
				if (windowForm != undefined && windowForm.elements["org.apache.struts.taglib.html.TOKEN"] != undefined) {
					windowForm.elements["org.apache.struts.taglib.html.TOKEN"].value = token.value;
				}
			}
		}
	}
}

/**
 * 検索条件を開く
 *
 * 引数  ： 検索条件領域のID
 * 引数  ： 開閉状態フラグの保存領域のNAME
 */
function selectPanelOpen(tblName, hiddenFlgName) {
	document.getElementById(tblName).style.display = "";
	document.getElementById(tblName + 'Title1').style.display = "none";
	document.getElementById(tblName + 'Title2').style.display = "";
	document.getElementsByName(hiddenFlgName)[0].value = "0";
}

/**
 * 検索条件を閉じる
 *
 * 引数  ： 検索条件領域のID
 * 引数  ： 開閉状態フラグの保存領域のNAME
 */
function selectPanelClose(tblName, hiddenFlgName) {
	document.getElementById(tblName).style.display = "none";
	document.getElementById(tblName + 'Title1').style.display = "";
	document.getElementById(tblName + 'Title2').style.display = "none";
	document.getElementsByName(hiddenFlgName)[0].value = "1";
}

/**
 * 各システムのコンテキストパス（base_common_js.jspにて設定）
 */
// 共通システムのコンテキストパス
var base_anPath = null;
// 操作中システムのコンテキストパス
var base_contextPath = null;


/**
 * 子画面表示用
 *
 * 引数  ： 子画面の横幅
 * 引数  ： 子画面の縦幅
 * 引数  ： 子画面初期表示用関数
 */
function openModalDialog(sizeWidth, sizeHeight, formName, formAction, param){
	var opt = {
		// 表示画面へのhidden設定
		'execute': function (doc, win) {
			if (param != undefined) {
				for(var paramName in param) {
					var elementParam = doc.createElement('input');
					elementParam.type = "hidden";
					elementParam.name = paramName;
					elementParam.value = param[paramName];
					doc.forms[0].appendChild(elementParam);
				}
			}

			doc.forms[0].name = formName;
			doc.forms[0].action = formAction;
			doc.forms[0].method = "POST";
			doc.forms[0].encoding = "multipart/form-data";
			downloadSubmit(doc.forms[0]);
        }
    };

// 2013/12/17 画面リロード対応：
//	var printURL = "./include/ChildDummy.jsp";
    var printURL = base_contextPath + "/include/ChildDummy.jsp";
 // 2013/12/17 画面リロード対応：

    if (opt) {
        opt.preExecute = opt;
    }
    optionalFunction = opt;

    // 子画面オープン後に追加関数を削除
    setTimeout(function(){optionalFunction="";}, 10);

    var size = "dialogWidth:" + sizeWidth + "px;" + "dialogHeight:" + sizeHeight + "px;";
    size += "resizable:yes;scrollbars=no;status=no;";

    var result = window.showModalDialog(printURL,this,size);
    return result;
}

/**
 * 子画面表示用（所属コード検索画面）
 *
 * 戻り値[0]： 所属コード
 * 戻り値[1]： 所属名称
 */
function openSyozokCd(){
    var param = new Object();
    param["actionCode"] = "INIT";
    param["selectType"] = "01";

    var result = openModalDialog(800, 490, "ANE301", base_contextPath + "/ANE301.do", param);
	if (result != undefined) {
		result = result.split("\t");
	}
    return result;
}
/**
 * 子画面表示用（職位コード検索画面）
 *
 * 戻り値[0]： 職位コード
 * 戻り値[1]： 職位名称
 */
function openSyokiCd(){
    var param = new Object();
    param["actionCode"] = "INIT";
    param["selectType"] = "02";

    var result = openModalDialog(800, 490, "ANE301", base_contextPath + "/ANE301.do", param);
	if (result != undefined) {
		result = result.split("\t");
	}
    return result;
}
/**
 * 子画面表示用（職能資格コード検索画面）
 *
 * 戻り値[0]： 職能資格コード
 * 戻り値[1]： 職能資格名称
 */
function openSyoksiCd(){
    var param = new Object();
    param["actionCode"] = "INIT";
    param["selectType"] = "03";

    var result = openModalDialog(800, 490, "ANE301", base_contextPath + "/ANE301.do", param);
	if (result != undefined) {
		result = result.split("\t");
	}
    return result;
}
/**
 * 子画面表示用（ユーザIDコード検索画面）
 *
 * 戻り値[0]： 内部識別ID
 * 戻り値[1]： ユーザID
 * 戻り値[2]： 氏名（氏）
 * 戻り値[3]： 氏名（名）
 */
function openUserId(){
    var param = new Object();
    param["actionCode"] = "INIT";
    param["selectType"] = "04";

    var result = openModalDialog(800, 490, "ANE301", base_contextPath + "/ANE301.do", param);
	if (result != undefined) {
		result = result.split("\t");
	}
    return result;
}
/**
 * 子画面表示用（運用管理コード検索画面）
 *
 * 戻り値[0]： 運用管理コード
 * 戻り値[1]： 運用管理名称
 */
function openUnyoknrCd(){
    var param = new Object();
    param["actionCode"] = "INIT";
    param["selectType"] = "05";

    var result = openModalDialog(800, 490, "ANE301", base_contextPath + "/ANE301.do", param);
	if (result != undefined) {
		result = result.split("\t");
	}
    return result;
}
/**
 * 子画面表示用（機能グループコード検索画面）
 *
 * 戻り値[0]： 機能グループコード
 * 戻り値[1]： 機能グループ名称
 */
function openKinoGrpCd(){
    var param = new Object();
    param["actionCode"] = "INIT";
    param["selectType"] = "06";

    var result = openModalDialog(800, 490, "ANE301", base_contextPath + "/ANE301.do", param);
	if (result != undefined) {
		result = result.split("\t");
	}
    return result;
}
/**
 * 子画面表示用（メニューコード検索画面）
 *
 * 戻り値[0]： メニューコード
 * 戻り値[1]： メニュー名称
 */
function openMenuCd(){
    var param = new Object();
    param["actionCode"] = "INIT";
    param["selectType"] = "07";

    var result = openModalDialog(800, 490, "ANE301", base_contextPath + "/ANE301.do", param);
	if (result != undefined) {
		result = result.split("\t");
	}
    return result;
}
/**
 * 子画面表示用（サブシステムコード検索画面）
 *
 * 戻り値[0]： サブシステムコード
 * 戻り値[1]： サブシステム名称
 */
function openSubSysCd(){
    var param = new Object();
    param["actionCode"] = "INIT";
    param["selectType"] = "08";

    var result = openModalDialog(800, 490, "ANE301", base_contextPath + "/ANE301.do", param);
	if (result != undefined) {
		result = result.split("\t");
	}
    return result;
}


/**
 * targetAction設定
 * 共通システム以外のコンテキストの場合、
 * ForwardAction経由で遷移するようaction、targetAction項目の設定を行う
 */
function setTargetAction(form) {
	if (base_anPath != null) {
		var anPath = base_anPath;
		var actionPath = getRouteRelativePath(form.action);
		var contextPath = getContextPath(actionPath);
		if (contextPath != anPath) {
			form.elements["targetAction"].value = actionPath;
			form.action = base_anPath + '/ForwardAction.do';
		}
	}
}
/**
 * targetActionリセット
 * ForwardAction経由で遷移するよう設定したaction、targetAction項目を元の設定に戻す
 */
function resetTargetAction(form) {
	if (base_anPath != null) {
		var actionPath = getRouteRelativePath(form.action);
		if (actionPath == base_anPath + '/ForwardAction.do') {
			form.action = form.elements["targetAction"].value;
			form.elements["targetAction"].value = "";
		}
	}
}
/**
 * 遷移先がないsubmit用
 * （子画面表示、ダウンロード、アップロード等）
 *
 * 引数  ： form フォーム
 * 引数  ： pass actionパス
 * 引数  ： target target
 */
function downloadSubmit(form, pass, target) {
	if (form != undefined) {
		form.method = "POST";
		if (pass != undefined) {
			form.action = pass;
		}
		if (target != undefined) {
			form.target = target;
		}

		// 業務の場合はForwardActionで経由する
		setTargetAction(form);

		// トークンチェックなし
		if (form.elements["flagTokenCheck"] == undefined) {
			var elementParam;
			elementParam = form.ownerDocument.createElement('input');
			elementParam.type = "hidden";
			elementParam.name = "flagTokenCheck";
			elementParam.value = false;
			form.appendChild(elementParam);
		} else {
			form.elements["flagTokenCheck"].value = false;
		}

		// submit
		form.submit();

		// ForwardActionで経由した場合はactionを戻す
		resetTargetAction(form);
	}
}
/**
 * 絶対パスからルートからの相対パスを取得する
 *
 * 引数  ： pass パス
 */
function getRouteRelativePath(pass) {
	var result = pass;

	// "//"の位置を検索
	var slashIdx = result.indexOf("//",1);
	if (-1 < slashIdx) {
		// 次の"/"（ルート）の位置を検索
		slashIdx = result.indexOf("/",slashIdx + 2);
		if (-1 < slashIdx) {
			result = result.substring(slashIdx);
		}
	}
	return result;
}
/**
 * パスからコンテキストパスを取得する
 *
 * 引数  ： pass パス
 */
function getContextPath(pass) {
	// ルート（"/"）からのパスに変換
	var actionPath = getRouteRelativePath(pass);
	var contextPath = "";
	// 2個目のスラッシュの位置（コンテキストパスの終了位置）を検索
	var contextIdx = actionPath.indexOf("/",1);
	if (-1 < contextIdx) {
		contextPath = actionPath.substring(0, contextIdx);
	}
	return contextPath;
}


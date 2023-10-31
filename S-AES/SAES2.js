var s = [
    [9, 4, 10, 11],
    [13, 1, 8, 5],
    [6, 2, 0, 3],
    [12, 14, 15, 7]];
var antis = [
    [10, 5, 9, 11],
    [1, 7, 8, 15],
    [6, 0, 2, 3],
    [12, 4, 13, 14]];
var tihuanwei = [
    [0, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 0, 1, 1],
    [0, 1, 0, 0],
    [0, 1, 0, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 1],
    [1, 0, 1, 0],
    [1, 0, 1, 1],
    [1, 1, 0, 0],
    [1, 1, 0, 1],
    [1, 1, 1, 0],
    [1, 1, 1, 1]];
var rcon1 = [1, 0, 0, 0, 0, 0, 0, 0];
var rcon2 = [0, 0, 1, 1, 0, 0, 0, 0];
//function SAES(mingwen, key) {
function x_de_n_fang_cheng_fx(xfx, a) {
    if (a[0] === 0) {
        for (let i = 0; i < 3; i++) {
            xfx[i] = a[i + 1];
        }
    } else {
        xfx[1] = a[2];
        xfx[2] = a[3] === 1 ? 0 : 1;
        xfx[3] = 1;
    }
}

function chengfa(a, b) {
    let result = new Array(4).fill(0);
    let xfx = new Array(4).fill(0);
    x_de_n_fang_cheng_fx(xfx, a);
    let x2fx = new Array(4).fill(0);
    x_de_n_fang_cheng_fx(x2fx, xfx);
    let x3fx = new Array(4).fill(0);
    x_de_n_fang_cheng_fx(x3fx, x2fx);

    if (b[0] === 1) {
        for (let i = 0; i < 4; i++) {
            result[i] ^= x3fx[i];
        }
    }
    if (b[1] === 1) {
        for (let i = 0; i < 4; i++) {
            result[i] ^= x2fx[i];
        }
    }
    if (b[2] === 1) {
        for (let i = 0; i < 4; i++) {
            result[i] ^= xfx[i];
        }
    }
    if (b[3] === 1) {
        for (let i = 0; i < 4; i++) {
            result[i] ^= a[i];
        }
    }
    return result;
}
function yihuo8(a, b) {
    let t = new Array(8).fill(0);
    for (let i = 0; i < 8; i++)
        t[i] = a[i] ^ b[i];
    return t;
}

function yihuo4(a, b) {
    let t = new Array(4).fill(0);
    for (let i = 0; i < 4; i++)
        t[i] = a[i] ^ b[i];
    return t;
}

function s_he_tihuan(temp) {
    let t1 = 2 * temp[0] + temp[1];
    let t2 = 2 * temp[2] + temp[3];
    let t3 = 2 * temp[4] + temp[5];
    let t4 = 2 * temp[6] + temp[7];
    let tihuan1 = s[t1][t2];
    let tihuan2 = s[t3][t4];
    for (let i = 0; i < 4; i++)
        temp[i] = tihuanwei[tihuan1][i];
    for (let i = 0; i < 4; i++)
        temp[i + 4] = tihuanwei[tihuan2][i];
}
function antis_he_tihuan(temp) {
    let t1 = 2 * temp[0] + temp[1];
    let t2 = 2 * temp[2] + temp[3];
    let t3 = 2 * temp[4] + temp[5];
    let t4 = 2 * temp[6] + temp[7];
    let tihuan1 = antis[t1][t2];
    let tihuan2 = antis[t3][t4];
    for (let i = 0; i < 4; i++)
        temp[i] = tihuanwei[tihuan1][i];
    for (let i = 0; i < 4; i++)
        temp[i + 4] = tihuanwei[tihuan2][i];
}

function zuoyi(temp) {
    for (let i = 4; i < 8; i++) {
        let t = temp[0][i];
        temp[0][i] = temp[1][i];
        temp[1][i] = t;
    }
}
function youyi(temp) {
    for (let i = 4; i < 8; i++) {
        let t = temp[1][i];
        temp[1][i] = temp[0][i];
        temp[0][i] = t;
    }
}
function g(temp, rcon) {
    let t = new Array(8).fill(0);
    for (let i = 0; i < 8; i++)
        t[i] = temp[i];
    for (let i = 0; i < 4; i++) {
        let tt = t[i + 4];
        t[i + 4] = t[i];
        t[i] = tt;
    }
    s_he_tihuan(t);
    return yihuo8(t, rcon);
}

function liehunxiao(mingwen) {
    let si_de2jinzhi = [0, 1, 0, 0];
    let m00 = new Array(4).fill(0);
    let m10 = new Array(4).fill(0);
    let m01 = new Array(4).fill(0);
    let m11 = new Array(4).fill(0);
    for (let i = 0; i < 4; i++) {
        m00[i] = mingwen[0][i];
        m10[i] = mingwen[0][i + 4];
        m01[i] = mingwen[1][i];
        m11[i] = mingwen[1][i + 4];
    }
    let n00 = yihuo4(m00, chengfa(si_de2jinzhi, m10));
    let n10 = yihuo4(chengfa(si_de2jinzhi, m00), m10);
    let n01 = yihuo4(m01, chengfa(si_de2jinzhi, m11));
    let n11 = yihuo4(chengfa(si_de2jinzhi, m01), m11);
    for (let i = 0; i < 4; i++) {
        mingwen[0][i] = n00[i];
        mingwen[0][i + 4] = n10[i];
        mingwen[1][i] = n01[i];
        mingwen[1][i + 4] = n11[i];
    }
}
function antiliehunxiao(mingwen) {
    let s1_de2jinzhi = [1, 0, 0, 1];//9
    let s2_de2jinzhi = [0, 0, 1, 0];//2
    let m00 = new Array(4).fill(0);
    let m10 = new Array(4).fill(0);
    let m01 = new Array(4).fill(0);
    let m11 = new Array(4).fill(0);
    for (let i = 0; i < 4; i++) {
        m00[i] = mingwen[0][i];
        m10[i] = mingwen[0][i + 4];
        m01[i] = mingwen[1][i];
        m11[i] = mingwen[1][i + 4];
    }
    let n00 = yihuo4(chengfa(s1_de2jinzhi, m00), chengfa(s2_de2jinzhi, m10));
    let n01 = yihuo4(chengfa(s1_de2jinzhi, m01), chengfa(s2_de2jinzhi, m11));
    let n10 = yihuo4(chengfa(s2_de2jinzhi, m00), chengfa(s1_de2jinzhi, m10));
    let n11 = yihuo4(chengfa(s2_de2jinzhi, m01), chengfa(s1_de2jinzhi, m11));
    for (let i = 0; i < 4; i++) {
        mingwen[0][i] = n00[i];
        mingwen[0][i + 4] = n10[i];
        mingwen[1][i] = n01[i];
        mingwen[1][i + 4] = n11[i];
    }
}

function lunmiyaojia(mingwen, key) {
    for (let i = 0; i < 2; i++)
        for (let j = 0; j < 8; j++)
            mingwen[i][j] ^= key[i][j];
}



function SAES(mingwen, key) {
    let key1 = new Array(2).fill(new Array(8).fill(0));
    let key2 = new Array(2).fill(new Array(8).fill(0));

    key1[0] = yihuo8(key[0], g(key[1], rcon1));
    key1[1] = yihuo8(key1[0], key[1]);
    key2[0] = yihuo8(key1[0], g(key1[1], rcon2));
    key2[1] = yihuo8(key2[0], key1[1]);

    lunmiyaojia(mingwen, key);

    s_he_tihuan(mingwen[0]);
    s_he_tihuan(mingwen[1]);
    zuoyi(mingwen);
    liehunxiao(mingwen);
    lunmiyaojia(mingwen, key1);

    s_he_tihuan(mingwen[0]);
    s_he_tihuan(mingwen[1]);
    zuoyi(mingwen);
    lunmiyaojia(mingwen, key2);

    return mingwen;
}
function SAES_decrypt(mingwen, key) {
    var key1 = new Array(2);
    for (let i = 0; i < 2; i++) {
        key1[i] = new Array(8);
    }
    var key2 = new Array(2);
    for (let i = 0; i < 2; i++) {
        key2[i] = new Array(8);
    }

    // 解密过程
    key1[0] = yihuo8(key[0], g(key[1], rcon1));
    key1[1] = yihuo8(key1[0], key[1]);
    key2[0] = yihuo8(key1[0], g(key1[1], rcon2));
    key2[1] = yihuo8(key2[0], key1[1]);

    lunmiyaojia(mingwen, key2);
    youyi(mingwen);
    antis_he_tihuan(mingwen[0]);
    antis_he_tihuan(mingwen[1]);
    lunmiyaojia(mingwen, key1);
    antiliehunxiao(mingwen);

    youyi(mingwen);
    antis_he_tihuan(mingwen[0]);
    antis_he_tihuan(mingwen[1]);
    lunmiyaojia(mingwen, key);

    return mingwen;
}
var text = new Array(2);
for (let i = 0; i < 2; i++) {
    text[i] = new Array(8);
}
var key = new Array(2);
for (let i = 0; i < 2; i++) {
    key[i] = new Array(8);
}
var mykey2 = new Array(2);
for (let i = 0; i < 2; i++) {
    mykey2[i] = new Array(8);
}
var stext = new Array(2);
for (let i = 0; i < 2; i++) {
    stext[i] = new Array(8);
}
//先定义一个空数组装准备输入的数据
//连接、定义输入框，提交按钮和显示框
var dPut = document.getElementById("put");
var dBtn = document.getElementById("btn");
var dInt = document.getElementById("int");
dBtn.onclick = function array() {
    let tt = dPut.value;
    let keyhasValue = key.some(row => row.some(value => value !== undefined));
    console.log(keyhasValue);
    let key2hasValue = mykey2.some(row => row.some(value => value !== undefined));
    console.log(key2hasValue);
    if (keyhasValue & key2hasValue) {
        if (tt.length == 16 & (key[0].length + key[1].length) == 16) {
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 8; j++) {
                    text[i][j] = parseInt(tt[i * 8 + j]);
                }
            }
            text = SAES(text, key);
            stext = SAES(text, mykey2);
            let s = "密文为： ";
            for (let i of stext)
                for (let j of i)
                    s += j;
            dInt.value = s;
            text = new Array(2);
            for (let i = 0; i < 2; i++) {
                text[i] = new Array(8);
            }
            stext = new Array(2);
            for (let i = 0; i < 2; i++) {
                stext[i] = new Array(8);
            }
            flag = 0;
        }
        else
            alert("明文和每次密钥都是16bits");
    }
    else
        alert("请先输入两次密钥");
}
//输入密钥
var flag = 0;
var dPut2 = document.getElementById("put2");
var dBtn2 = document.getElementById("btn2");
dBtn2.onclick = function array() {
    let keyhasValue = key.some(row => row.some(value => value !== undefined));
    console.log(keyhasValue);
    if (!flag) {
        let tt16 = dPut2.value;
        let tt = parseInt(tt16, 16).toString(2).padStart(16, '0');
        console.log(tt);
        if (tt.length == 16) {
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 8; j++) {
                    key[i][j] = parseInt(tt[i * 8 + j]);
                }
            }
            flag++;
            dPut2.value = "";
            dInt.value = "请输入第二次的密钥";
        }
        else
            alert("请输入16bit密钥")
    }
    else {
        for (let i = 0; i < 2; i++) {
            mykey2[i] = new Array(8);
        }
        let tt16 = dPut2.value;
        let tt = parseInt(tt16, 16).toString(2).padStart(16, '0');
        console.log(tt);
        if (tt.length == 16) {
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 8; j++) {
                    mykey2[i][j] = parseInt(tt[i * 8 + j]);
                }
            }
            dInt.value = "两次密钥输入完成";
        }
        else
            alert("请输入16bit密钥")
    }
}
//输入密文
var dPut3 = document.getElementById("put3");
var dBtn3 = document.getElementById("btn3");
dBtn3.onclick = function array() {
    let tt = dPut3.value;
    let keyhasValue = key.some(row => row.some(value => value !== undefined));
    console.log(keyhasValue);
    let key2hasValue = mykey2.some(row => row.some(value => value !== undefined));
    console.log(key2hasValue);
    if (keyhasValue & key2hasValue) {
        if (tt.length == 16 & (key[0].length + key[1].length) == 16) {
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 8; j++) {
                    stext[i][j] = parseInt(tt[i * 8 + j]);
                }
            }
            stext = SAES_decrypt(stext, mykey2);
            text = SAES_decrypt(stext, key);
            let s = "密文为： ";
            for (let i of text)
                for (let j of i)
                    s += j;
            dInt.value = s;
            text = new Array(2);
            for (let i = 0; i < 2; i++) {
                text[i] = new Array(8);
            }
            stext = new Array(2);
            for (let i = 0; i < 2; i++) {
                stext[i] = new Array(8);
            }
            flag = 0;
        }
        else
            alert("明文和每次密钥都是16bits");
    }
    else
        alert("请先输入两次密钥");
}
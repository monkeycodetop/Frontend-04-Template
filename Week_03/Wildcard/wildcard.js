function find(source,pattern){
    // 最后一个*尽量多的匹配，之前的*尽量少匹配
    let starCount = 0;
    // 找*个数
    for(let i = 0; i < pattern.length; i++){
        if(pattern[i] === "*"){
            starCount ++;
        }
    }

    // 如果没有*，挨个字符匹配
    if(starCount === 0){
        for(let i = 0; i < pattern.length; i++){
            if(pattern[i] !== source[i] && pattern[i] !== "?") {
                return false;
            }
        }
        return true;
    }

    let i = 0;
    let lastIndex = 0;
    // 从起始位置判断遇到第一个*之前的字符是否匹配
    for(i = 0; pattern[i] !== "*"; i++){
        if(pattern[i] !== source[i] && pattern[i] !== "?") {
            return false;
        }
    }
    // 记录第一个*的index
    lastIndex = i;

    for(let p = 0; p < starCount -1; p++){
        i++;
        let subPattern = "";
        // 找当前*与下一个*之前的内容
        while(pattern[i] !== "*") {
            subPattern += pattern[i];
            i++;
        }

        let reg = new RegExp(subPattern.replace(/\?/g,"[\\s\\S]"),"g");
        reg.lastIndex = lastIndex;

        if(!reg.exec(source)){
            return false;
        }
        lastIndex = reg.lastIndex;
    }

    // 最后*后面内容的匹配
    for(let j = 0; j <= source.length - lastIndex && pattern[pattern.length - j] !== "*"; j++){
        if(pattern[pattern.length = j] !== source[source.length - j]
        && pattern[pattern.length - j] !== "?"){
            return false;
        }
    }
    return true;
}

find("abcabcabxaac","a*b*bx*c");
find("abcabcabxaac","a*b?*b?x*c");
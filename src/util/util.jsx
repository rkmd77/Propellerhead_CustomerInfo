class MUtil {
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || 'get',
                url: param.url || '',
                dataType: param.dataType || 'json',
                data: param.data || null,
                success: res => {
                    typeof resolve === 'function' && resolve(res);
                },
                error: err => {
                    typeof reject === 'function' && reject(err);
                }
            });
        });
    }
    // on success 
    successTips(successMsg) {
        alert(successMsg || 'Success!');
    }
    // on error
    errorTips(errMsg) {
        alert(errMsg || 'Something is wrong!');
    }
}

export default MUtil;
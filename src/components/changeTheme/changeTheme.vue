<template>
<el-row class='changeThemeContainer'>
    <!-- <span class='title' @click='openThemeDialog'>切换主题色</span> -->
    <span  class='title'>切换主题色</span>
    <el-switch v-model='switchColors' 
    active-color="#438eb9"
    @change='SwitchColor'
    inactive-color="#365887">
    </el-switch>
    <el-dialog
        :visible.sync="themeDialogVisible"
        width='400px'
        title='切换主题色'
        >
        <el-form>
            <el-form-item>
                <el-color-picker v-model="colors.primary" ></el-color-picker>
            </el-form-item>
            <el-form-item>
                <el-button size='small' type="primary" @click="changeThemeFunc">切 换</el-button>
                <el-button size='small' @click="resetTheme">重 置</el-button>
            </el-form-item>
        </el-form>
        
    </el-dialog>
</el-row>
    
</template>
<script>
import generateColors from './utils/color'
import objectAssign from 'object-assign'
import axios from 'axios'
// import Promise from 'es6-promise-polyfill'
import { mapGetters } from 'vuex'
// var Promise = require('es6-promise-polyfill').Promise
export default {
    data () {
        return {
            colors: {
                primary: null
            },
            originalStyle: '',
            // primaryColor: null,
            themeDialogVisible: false,
            switchColors: true
      }
    },
    computed: {
        ...mapGetters(['primaryColor'])
        
    },
    methods: {
        openThemeDialog () {
            this.themeDialogVisible = true
        },
        resetTheme () {
            this.themeDialogVisible = false
            this.colors.primary = '#365887'
            this.$store.commit('setPrimaryColor', this.colors.primary)
            // this.primaryColor = this.colors.primary
            this.colors = objectAssign({}, this.colors, generateColors(this.colors.primary))
            this.writeNewStyle()
        },
        SwitchColor () {
            if(this.switchColors) {
                this.colors.primary = '#365887'
                this.changeThemeFunc()
            } else {
                this.colors.primary = '#438eb9'
                this.changeThemeFunc()
            }
            
        },
        changeThemeFunc () {
            // this.themeDialogVisible = false
            this.$store.commit('setPrimaryColor', this.colors.primary)
            // this.primaryColor = this.colors.primary
            this.colors = objectAssign({}, this.colors, generateColors(this.colors.primary))
            this.writeNewStyle()
        },
        writeNewStyle () {
            let cssText = this.originalStyle
            Object.keys(this.colors).forEach(key => {
                cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + this.colors[key])
            })
            let isCSS = document.getElementById('themeCss');
            
            console.log(isCSS)
            if (isCSS) { // 已经添加就修改，没有添加就添加
                isCSS.innerText = cssText
            } else {
                const style = document.createElement('style')
                style.setAttribute('id','themeCss')
                style.innerText = cssText
                // document.head.insertBefore(style, document.head.children[0])
                // console.log($('head').children('style'))
                // let appendDom = $('head').children('style')[1]
                $('#theme').after(style)
                // document.head.appendChild(style)
            }
        },
        getStyleTemplate (data) {
            const colorMap = {
                '#3a8ee6': 'shade-1',
                '#409eff': 'primary',
                '#53a8ff': 'light-1',
                '#66b1ff': 'light-2',
                '#79bbff': 'light-3',
                '#8cc5ff': 'light-4',
                '#a0cfff': 'light-5',
                '#b3d8ff': 'light-6',
                '#c6e2ff': 'light-7',
                '#d9ecff': 'light-8',
                '#ecf5ff': 'light-9'
            }
            Object.keys(colorMap).forEach(key => {
                const value = colorMap[key]
                data = data.replace(new RegExp(key, 'ig'), value)
            })
            return data
        },
        getIndexStyle () {
            // this.getFile('/static/theme/index.css')
            // this.getFile('//unpkg.com/element-ui/lib/theme-chalk/index.css')
            // .then(({ data }) => {
            //     console.log(data)
            //     this.originalStyle = this.getStyleTemplate(data)
            // })
            // .catch((err) => {
            //     console.log('promiseError')
            //     console.log(err)
            // })
            $.ajax({
                type: 'GET',
                url: '/static/theme/index.css',
                success: (data) => {
                    // console.log(data)
                    this.originalStyle = this.getStyleTemplate(data)
                }
            })
        },
        getFile (url, isBlob = false) {
            console.log( Promise)
            return new Promise((resolve, reject) => {
                const client = new XMLHttpRequest()
                client.responseType = isBlob ? 'blob' : ''
                client.onreadystatechange = () => {
                    if (client.readyState !== 4) {
                        return
                    }
                    if (client.status === 200) {
                        const urlArr = client.responseURL.split('/')
                        resolve({
                            data: client.response,
                            url: urlArr[urlArr.length - 1]
                        })
                    } else {
                        reject(new Error(client.statusText))
                    }
                }
                // console.log(url)
                client.open('GET', url)
                client.send()
            })
        },
    },
    created () {
        this.getIndexStyle()
        
    },
    mounted () {
        this.colors.primary = this.primaryColor
    }
}
</script>
<style lang="scss" scoped>
.changeThemeContainer {
    // display: inline-block;
    float: right;
    margin-right: 20px;
    .title{
        color: #fff;
        margin-right: 10px;
    }
    .el-dialog__wrapper .dialog-footer {
        text-align: center;
        width: 100%;
    }
}
</style>



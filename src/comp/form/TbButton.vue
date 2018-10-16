<template>
    <div class="-tb-button-wrapper">
        <button ref="button" 
                :class="['-tb-button', `elevation-${elevationValue}`, `${disabled?'':color}`]"
                :border="border" 
                :flat="border?false:flat" 
                :disabled="disabled" 
                @click="click"
                @mousedown="upElevation"
                @mouseup="recoverElevation">
            <slot></slot>
        </button>
    </div>
</template>

<script>
export default {
    name : 'tbButton',
    props : {
        disabled : { type:Boolean, default:false },
        border : { type:Boolean, default:true },
        flat : { type:Boolean, default:false },
        elevation : { type:[Number,String], default:0 },
        color : { type:String, default:'primary' }
    },
    data : function () {
        return {
            elevationValue : 0
        }
    },
    watch : {
        elevation : (val) => {
            this.elevationValue = Number(val);
        }
    },
    mounted : function () { 
        this.elevationValue = this.elevation;
    },
    methods : {
        upElevation : function () {
            console.log(this.elevationValue);
            console.log(typeof(this.elevationValue));
            if (typeof(this.elevationValue)=='number') {
                this.elevationValue += 3;
            }
        },
        recoverElevation : function () {
            this.elevationValue = Number(this.elevation);
        },
        click : function () {
            this.$emit ('click');
        }
    }
}
</script>

<style>
    .-tb-button-wrapper {
        /* display, position, size */
        display: inline-block;
        height:36px;
        width: 90px;
    }
    .-tb-button {
        height: 100%;
        line-height:100%;
        width: 100%;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-weight: bold;
        font-size: 14px;
        font-family: "Roboto";
        padding: 0px 6px;
    }
    .-tb-button:focus {
        outline: none;
    }
    .-tb-button[disabled] {
        background-color: #E0E0E0;
        color: #A6A6A6;
        cursor: default;
    }
    .-tb-button[flat] {
        background-color: transparent;
    }
    .-tb-button[border] {
        outline: buttontext auto 5px;
    }
</style>

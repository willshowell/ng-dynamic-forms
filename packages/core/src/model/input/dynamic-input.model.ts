import { DynamicFormControlClsConfig } from "../dynamic-form-control.model";
import { DynamicInputControlModel, DynamicInputControlModelConfig } from "../dynamic-input-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { Utils } from "../../utils/core.utils";

export const DYNAMIC_FORM_CONTROL_TYPE_INPUT = "INPUT";

export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_COLOR = "color";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATE = "date";
//export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATETIME = "datetime";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATETIME_LOCAL = "datetime-local";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_EMAIL = "email";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE = "file";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_MONTH = "month";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER = "number";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_PASSWORD = "password";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_RANGE = "range";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_SEARCH = "search";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEL = "tel";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT = "text";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_TIME = "time";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_URL = "url";
export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_WEEK = "week";

export interface DynamicInputModelConfig extends DynamicInputControlModelConfig<string | number | Date | string[]> {

    accept?: string;
    inputType?: string;
    dataType?: string;
    list?: string[];
    objectArray?: [{}];
    mask?: string | RegExp | (string | RegExp)[];
    max?: number | string | Date;
    min?: number | string | Date;
    multiple?: boolean;
    pattern?: string;
    step?: number;
}

export class DynamicInputModel extends DynamicInputControlModel<string | number | Date | string[]> {

    @serializable() accept: string | null;
    @serializable() inputType: string;
    @serializable() dataType: string;    
    files: FileList | null = null;
    @serializable() list: string[] | null;
    @serializable() objectArray: [{}] | null;
    @serializable() mask: string | RegExp | (string | RegExp)[] | null;
    @serializable() max: number | string | Date | null;
    @serializable() min: number | string | Date | null;
    @serializable() multiple: boolean | null;
    @serializable() pattern: string | null;
    @serializable() step: number | null;

    private listId: string | null = null;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_INPUT;

    constructor(config: DynamicInputModelConfig, clsConfig?: DynamicFormControlClsConfig) {

        super(config, clsConfig);

        this.accept = config.accept || null;
        this.inputType = config.inputType || DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT;
        this.dataType = config.dataType || null;        
        this.list = Array.isArray(config.list) ? config.list : null;
        this.objectArray = Array.isArray(config.objectArray) ? config.objectArray : null;
        this.mask = config.mask || null;
        this.max = config.max !== undefined ? config.max : null;
        this.min = config.min !== undefined ? config.min : null;
        this.multiple = typeof config.multiple === "boolean" ? config.multiple : null;
        this.pattern = config.pattern || null;
        this.step = typeof config.step === "number" ? config.step : null;

        if (this.list) {
            this.listId = `${this.id}List`;
        }
    }

    toJSON() {

        let json: any = super.toJSON();

        if (this.mask !== null) { json.mask = Utils.maskToString(this.mask); }

        return json;
    }
}
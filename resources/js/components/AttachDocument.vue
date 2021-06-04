<template>
    <v-card elevation="3" class="pa-5">
        <v-row>
            <v-col>
                <v-icon>
                    mdi-paperclip
                </v-icon> แนบเอกสาร</v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-form>
                    <v-row>
                        <v-col>
                            <span>เอกสารหมายเลข 3</span>
                            <v-dialog
                                v-model="dialog"
                                width="800"
                                persistent
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        class="mx-2"
                                        fab
                                        dark
                                        small
                                        color="success"
                                        v-bind="attrs"
                                        v-on="on"
                                        @click="doc_type='3'"
                                    >
                                        <v-icon dark>
                                            mdi-plus
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <form action="">
                                <v-card>
                                    <v-card-title class="text-h5 lighten-2">

                                    </v-card-title>

                                    <v-card-text>
                                        <v-row>
                                            <v-col>
                                                <v-text-field
                                                    v-if="doc_type=='4'"
                                                    dense
                                                    outlined
                                                    label="เอกสารสำหรับตำแหน่ง"
                                                ></v-text-field>
                                                <v-textarea
                                                    hide-details
                                                    no-resize
                                                    outlined
                                                    rows="3"
                                                    row-height="15"
                                                    name="doc_name"
                                                    :label="'ชื่อเอกสารหมายเลข ' + doc_type"
                                                ></v-textarea>
                                            </v-col>
                                        </v-row>
                                        <v-row>

                                        <v-col>
                                            <div class="flex items-center justify-center w-full h-screen text-center">
                                                <div class="bg-gray-100" @dragover="dragover" @dragleave="dragleave" @drop="drop" style="border-radius: 5px; padding: 10px; cursor:pointer;">
                                                    <input type="file" style="display: none;" multiple name="fields[assetsFieldHandle][]" id="assetsFieldHandle"
                                                    class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange" ref="file" accept=".pdf,.docx,.doc" />

                                                    <label for="assetsFieldHandle" class="block">
                                                    <div  style="cursor:pointer;">
                                                        <v-icon left>mdi-paperclip</v-icon> วางไฟล์ที่ต้องการ หรือ คลิก เพื่อเลือกไฟล์<br>
                                                        Action Plan, Test Plan, Rollback Plan หรือเอกสารอื่น ๆ
                                                    </div>
                                                    </label>
                                                </div>
                                            </div>
                                            <v-chip
                                                small
                                                v-for="(item,index) in file_list"
                                                :key="index"
                                                class="ma-2"
                                                outlined
                                                label
                                                :close="true"
                                                @click="downloadFile(item)"
                                                :color="item.id == 0 ? 'green' : 'primary'"
                                                @click:close="deleteFile(item,index)"
                                                >
                                                {{ item.file_title }}
                                            </v-chip>


                                        </v-col>
                                    </v-row>
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn
                                        color="success"
                                        outlined
                                        @click="dialog = false"
                                    >
                                        บันทึก
                                    </v-btn>
                                    <v-btn
                                        color="red"
                                        text
                                        @click="dialog = false"
                                    >
                                        ยกเลิก
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                                </form>
                            </v-dialog>
                            <v-card
                                class="mt-5 pa-2"
                            >
                                <v-row>
                                    <v-col cols="2">ชื่อเอกสาร</v-col>
                                    <v-col cols="6">{{document_test.name}}</v-col>
                                    <v-col>
                                        <v-chip
                                            v-for="(file,index) in document_test.file_list"
                                            :key="index"
                                            class="ma-2"
                                            color="pink"
                                            label
                                            small
                                            text-color="white"
                                            >
                                            <v-icon left>
                                                mdi-paperclip
                                            </v-icon>
                                            {{file}}
                                        </v-chip>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <span>เอกสารหมายเลข 4</span>
                            <v-btn
                                class="mx-2"
                                fab
                                dark
                                small
                                color="success"
                                @click="dialog=true;doc_type='4'"
                                >
                                <v-icon dark>
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                            <v-card
                                class="mt-5 pa-2"
                                v-for="(item,index) in document_test_list.filter(x=>x.doc_type=='4')"
                                :key="index"
                            >
                                <v-row>
                                    <v-col>เอกสารสำหรับตำแหน่ง : {{item.doc_for}}</v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="2">ชื่อเอกสาร</v-col>
                                    <v-col cols="6">{{item.name}}</v-col>
                                    <v-col>
                                        <v-chip
                                            v-for="(file,index) in item.file_list"
                                            :key="index"
                                            class="ma-2"
                                            color="pink"
                                            label
                                            small
                                            text-color="white"
                                            >
                                            <v-icon left>
                                                mdi-paperclip
                                            </v-icon>
                                            {{file}}
                                        </v-chip>
                                    </v-col>
                                </v-row>
                            </v-card>

                        </v-col>
                    </v-row>

                </v-form>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    data(){
        return {
            dialog: false,
            doc_type: '',
            file_list: [],
            document_list: [],
            document_test:{
                'doc_type' : '3',
                'name' : 'ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ',
                'file_list' : ['เอกสารหมายเลข3.pdf','เอกสารหมายเลข3.docx']
            },
            document_test_list:[
                {
                    'doc_type' : '3',
                    'doc_for' : '',
                    'name' : 'ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ',
                    'file_list' : ['เอกสารหมายเลข3.pdf','เอกสารหมายเลข3.docx']
                },
                {
                    'doc_type' : '4',
                    'doc_for' : 'นักวิชาการคลัง',
                    'name' : 'ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ',
                    'file_list' : ['เอกสารหมายเลข4_1.pdf','เอกสารหมายเลข4_1.docx']
                },
                {
                    'doc_type' : '4',
                    'doc_for' : 'นักวิชาการเงินและบัญชี',
                    'name' : 'ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ชื่อเอกสาร ',
                    'file_list' : ['เอกสารหมายเลข4_2.pdf','เอกสารหมายเลข4_2.docx']
                },
            ]
        }
    },
    methods: {
        onChange() {
            let files = [...this.$refs.file.files];
            if (files){
                for (let i=0;i<files.length;i++){

                    if (files[i].type === 'image/jpeg' || files[i].type === 'image/png' || files[i].type === 'application/pdf'){
                        // this.document_files.push(files[i]);
                        // this.form_edit.document_relate.push(files[i].name);
                        let file = {
                            id:0,
                            file_title: files[i].name,
                            file_content: files[i]
                        }
                        this.file_list.push(file);
                    }
                }

            }
        },
        dragover(event) {
            event.preventDefault();
            // Add some visual fluff to show the user can drop its files
            if (!event.currentTarget.classList.contains('bg-green-300')) {
                event.currentTarget.classList.remove('bg-gray-100');
                event.currentTarget.classList.add('bg-green-300');
            }
        },
        dragleave(event) {
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        drop(event) {
            event.preventDefault();
            this.$refs.file.files = event.dataTransfer.files;
            this.onChange(); // Trigger the onChange event manually
            // Clean up
            document.getElementById('assetsFieldHandle').value= null;



            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        async deleteFile(item,index) {
      // Prompt here with text if required
            // this.form_edit.document_relate.splice(index, 1)
            // this.form_edit.document_files.splice(index, 1)
            if (item.id == 0){
                this.file_list.splice(index,1);
            }else{
                // Swal.fire({
                //     title: "กรุณายืนยันการลบรายการจากฐานข้อมูล",
                //     icon: "warning",
                //     allowOutsideClick: false,
                //     showCancelButton: true,
                //     confirmButtonText: `ยืนยัน`,
                //     cancelButtonText: `ยกเลิก`,
                //     }).then((result) => {
                //     /* Read more about isConfirmed, isDenied below */
                //     if (result.isConfirmed) {
                //         this.delFile(item.id);
                //     } else if (result.isDenied) {
                //         // Swal.fire('Changes are not saved', '', 'info')
                //     }
                // })


            }
        },
    }
}
</script>

<style scoped>
.bg-gray-100{
    background-color: #c5c5c5;
    border: 1px solid #c5c5c5;
}
.bg-green-300{
    background-color: #7ace79;
    border: 1px solid #c5c5c5;

}
</style>

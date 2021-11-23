## Instructions to run (Same as mp_sort):

1.  Go to the root folder SC02_G10_DDW_2D_Website: `cd SC02_G10_DDW_2D_Website`
2.  From the root folder, i.e. SC02_G10_DDW_2D_Website, create virtual environment called virtenv: `python -m venv virtenv`
3.  A folder called virtenv will be created. Now, activate the virtual environment: `source virtenv/bin/activate`
4.  Install requirements: `python -m pip install -U --force-reinstall -r requirements.txt`
5.  Go into the static folder to compile library.py: `cd /app/static`
6.  Run Transcrypt on library.py: `python -m transcrypt -b -n library`
7.  Make `runflaskvoc.sh` executable: `chmod a+x ./runflaskvoc.sh`
8.  Finally: `./runflaskvoc.sh`
9.  Once its running, another tab in your browser and type the following url: `https://myserver.vocareum.com/`.
